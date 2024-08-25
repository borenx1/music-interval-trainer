import { Audio, type AVPlaybackSource } from 'expo-av';

import { PIANO_AUDIO_FILE_MAP } from '@/utils/music';

/**
 * Play 2 audio files with a delay between them. Need to load the audio files first.
 * @param source1 The first audio file.
 * @param source2 The second audio file.
 * @param delayMs The delay between the two audio files in milliseconds.
 * @returns The Sound objects and a function to unload the file.
 */
export async function playTwoSounds(
  source1: AVPlaybackSource,
  source2: AVPlaybackSource,
  delayMs: number,
) {
  const sound1 = new Audio.Sound();
  const sound2 = new Audio.Sound();
  await sound1.loadAsync(source1, { volume: 0.5 });
  await sound2.loadAsync(source2, { volume: 0.5 });

  await sound1.playAsync();
  setTimeout(async () => {
    const status2 = await sound2.getStatusAsync();
    if (status2.isLoaded) {
      sound2.playAsync();
    }
  }, delayMs);

  return {
    sound1,
    sound2,
    unload: async () => {
      await sound1.unloadAsync();
      await sound2.unloadAsync();
    },
  };
}

/**
 * Play 2 sounds with a delay between them. The sounds should be loaded before calling this function.
 * @param sound1 The first sound.
 * @param sound2 The second sounds
 * @param delayMs The delay between the two sounds in milliseconds.
 * @returns A function to stop the playback.
 */
export async function playTwoSoundsLoaded(
  sound1: Audio.Sound,
  sound2: Audio.Sound,
  delayMs: number,
) {
  let isPlaySecondSound = true;
  await sound1.replayAsync();
  setTimeout(() => {
    if (isPlaySecondSound) {
      sound2.replayAsync();
    }
  }, delayMs);
  return {
    stop: async () => {
      isPlaySecondSound = false;
      await sound1.stopAsync();
      await sound2.stopAsync();
    },
  };
}

/**
 * Load all the piano audio files.
 * @returns The sounds and a function to unload the sounds.
 */
export async function loadSoundboard() {
  const sounds = Object.keys(PIANO_AUDIO_FILE_MAP).reduce<Record<string, Audio.Sound>>(
    (acc, note) => {
      acc[note] = new Audio.Sound();
      return acc;
    },
    {},
  );
  const loadFunctions = Object.entries(sounds).map(([note, sound]) => async () => {
    // @ts-ignore
    await sound.loadAsync(PIANO_AUDIO_FILE_MAP[note], {
      volume: 0.5,
      androidImplementation: 'MediaPlayer', // Prevent Player does not exist bug.
    });
  });
  await Promise.all(loadFunctions.map((f) => f()));

  return {
    sounds,
    getNoteSound: (note: number) => sounds[note],
    unload: async () => {
      await Promise.all(Object.values(sounds).map((sound) => sound.unloadAsync()));
    },
  };
}

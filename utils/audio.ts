import { Audio, type AVPlaybackSource } from 'expo-av';

/**
 * Play 2 audio files with a delay between them.
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

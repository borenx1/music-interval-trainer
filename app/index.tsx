import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useMusicInterval } from '@/hooks/useMusicInterval';
import { playTwoSoundsLoaded, loadSoundboard } from '@/utils/audio';
import { ThemedView } from '@/components/ThemedView';
import IntervalDisplay from '@/components/IntervalDisplay';
import IconButton from '@/components/IconButton';

export default function Index() {
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isIntervalHidden, setIsIntervalHidden] = useState(true);
  const { interval, setInterval, getRandomInterval } = useMusicInterval(16, 52, 12);
  const soundboardRef = useRef<Awaited<ReturnType<typeof loadSoundboard>>>();
  const stopAudioRef = useRef<() => Promise<void>>();

  const handlePlay = async () => {
    let intervalToPlay = interval;
    if (!isStarted) {
      intervalToPlay = getRandomInterval();
      setInterval(intervalToPlay);
      setIsIntervalHidden(true);
      setIsStarted(true);
    }
    if (stopAudioRef.current) {
      await stopAudioRef.current();
    }
    const { stop } = await playTwoSoundsLoaded(
      soundboardRef.current?.getNoteSound(intervalToPlay.lowNote)!,
      soundboardRef.current?.getNoteSound(intervalToPlay.highNote)!,
      1000,
    );
    stopAudioRef.current = stop;
  };
  const handleNext = async () => {
    if (isIntervalHidden) {
      setIsIntervalHidden(false);
    } else {
      const intervalToPlay = getRandomInterval();
      setInterval(intervalToPlay);
      setIsIntervalHidden(true);

      if (stopAudioRef.current) {
        await stopAudioRef.current();
      }
      const { stop } = await playTwoSoundsLoaded(
        soundboardRef.current?.getNoteSound(intervalToPlay.lowNote)!,
        soundboardRef.current?.getNoteSound(intervalToPlay.highNote)!,
        1000,
      );
      stopAudioRef.current = stop;
    }
  };

  // Load the sounds when the component mounts.
  useEffect(() => {
    if (!soundboardRef.current) {
      const initSoundboard = async () => {
        const soundboard = await loadSoundboard();
        soundboardRef.current = soundboard;
        setIsAudioLoaded(true);
      };
      initSoundboard();
    }
    return () => {
      soundboardRef.current?.unload();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <IntervalDisplay
        interval={interval.interval}
        lowNote={interval.lowNote}
        isHidden={isIntervalHidden}
      />
      <ThemedView style={styles.actionsContainer}>
        <IconButton
          icon="volume-up"
          size={120}
          iconSize={40}
          backgroundColor={{ light: '#22C55E', dark: '#22C55E' }}
          iconColor={{ light: '#000', dark: '#000' }}
          hide={!isAudioLoaded}
          onPressIn={handlePlay}
        />
        <IconButton
          icon={isIntervalHidden ? 'visibility' : 'arrow-forward'}
          size={120}
          iconSize={40}
          backgroundColor={{ light: '#D6D3D1', dark: '#A8A29E' }}
          iconColor={{ light: '#000', dark: '#000' }}
          hide={!isAudioLoaded || !isStarted}
          onPressIn={handleNext}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 20,
  },
});

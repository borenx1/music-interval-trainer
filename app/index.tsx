import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { useMusicInterval } from '@/hooks/useMusicInterval';
import { ThemedView } from '@/components/ThemedView';
import IntervalDisplay from '@/components/IntervalDisplay';
import IconButton from '@/components/IconButton';

export default function Index() {
  const [isStarted, setIsStarted] = useState(false);
  const [isIntervalHidden, setIsIntervalHidden] = useState(true);
  const { interval, setInterval, getRandomInterval } = useMusicInterval(1, 12);

  const handlePlay = () => {
    if (!isStarted) {
      setInterval(getRandomInterval());
      setIsIntervalHidden(true);
      setIsStarted(true);
    }
    console.log(`Play: ${interval}`);
  };
  const handleNext = () => {
    if (isIntervalHidden) {
      setIsIntervalHidden(false);
    } else {
      setInterval(getRandomInterval());
      setIsIntervalHidden(true);
    }
  };

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
          onPress={handlePlay}
        />
        <IconButton
          icon={isIntervalHidden ? 'visibility' : 'arrow-forward'}
          size={120}
          iconSize={40}
          backgroundColor={{ light: '#D6D3D1', dark: '#A8A29E' }}
          iconColor={{ light: '#000', dark: '#000' }}
          hide={!isStarted}
          onPress={handleNext}
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

import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import IntervalDisplay from '@/components/IntervalDisplay';
import IconButton from '@/components/IconButton';

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <IntervalDisplay interval="??" subtitle="A4 - B4" />
      <ThemedView style={styles.actionsContainer}>
        <IconButton
          icon="volume-up"
          size={120}
          iconSize={40}
          backgroundColor={{ light: '#22C55E', dark: '#22C55E' }}
          iconColor={{ light: '#000', dark: '#000' }}
        />
        <IconButton
          icon="visibility"
          size={120}
          iconSize={40}
          backgroundColor={{ light: '#D6D3D1', dark: '#A8A29E' }}
          iconColor={{ light: '#000', dark: '#000' }}
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

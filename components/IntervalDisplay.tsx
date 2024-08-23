import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  interval: string;
  subtitle?: string;
};

export default function IntervalDisplay({ interval, subtitle }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>{interval}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.subtitleContainer}>
        {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    minHeight: 300,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 40,
    fontSize: 72,
  },
  subtitleContainer: {
    width: '100%',
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
});

import { useState } from 'react';

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const INTERVALS = [
  'U',
  'm2',
  'M2',
  'm3',
  'M3',
  'P4',
  'TT',
  'P5',
  'm6',
  'M6',
  'm7',
  'M7',
  '8ve',
  'm9',
  'M9',
  'm10',
  'M10',
];

/**
 * Get the string representation of a note.
 * @param note The note number (1-88 / A0 - C8).
 */
export function mapNote(note: number) {
  return NOTES[(note - 1) % 12] + Math.floor((note + 8) / 12);
}

export function mapInterval(interval: number) {
  return INTERVALS[interval] ?? '?';
}

export function useMusicInterval(lowest: number, maxInterval: number) {
  if (lowest < 1 || lowest > 70) {
    throw new Error(`Invalid lowest note: ${lowest}`);
  }
  if (maxInterval < 1 || maxInterval > 16) {
    throw new Error(`Invalid max interval: ${maxInterval}`);
  }
  const getRandomInterval = () => {
    const randomLowNote = Math.floor(Math.random() * (70 - lowest) + lowest);
    const randomInterval = Math.floor(Math.random() * maxInterval + 1);

    return { lowNote: randomLowNote, interval: randomInterval };
  };

  const [interval, setInterval] = useState(getRandomInterval());

  return {
    interval,
    setInterval,
    getRandomInterval,
  };
}

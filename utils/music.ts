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
export const PIANO_AUDIO_FILE_MAP = {
  16: require('@/assets/audio/piano/2-c.mp3'),
  17: require('@/assets/audio/piano/2-cs.mp3'),
  18: require('@/assets/audio/piano/2-d.mp3'),
  19: require('@/assets/audio/piano/2-ds.mp3'),
  20: require('@/assets/audio/piano/2-e.mp3'),
  21: require('@/assets/audio/piano/2-f.mp3'),
  22: require('@/assets/audio/piano/2-fs.mp3'),
  23: require('@/assets/audio/piano/2-g.mp3'),
  24: require('@/assets/audio/piano/2-gs.mp3'),
  25: require('@/assets/audio/piano/2-a.mp3'),
  26: require('@/assets/audio/piano/2-as.mp3'),
  27: require('@/assets/audio/piano/2-b.mp3'),
  28: require('@/assets/audio/piano/3-c.mp3'),
  29: require('@/assets/audio/piano/3-cs.mp3'),
  30: require('@/assets/audio/piano/3-d.mp3'),
  31: require('@/assets/audio/piano/3-ds.mp3'),
  32: require('@/assets/audio/piano/3-e.mp3'),
  33: require('@/assets/audio/piano/3-f.mp3'),
  34: require('@/assets/audio/piano/3-fs.mp3'),
  35: require('@/assets/audio/piano/3-g.mp3'),
  36: require('@/assets/audio/piano/3-gs.mp3'),
  37: require('@/assets/audio/piano/3-a.mp3'),
  38: require('@/assets/audio/piano/3-as.mp3'),
  39: require('@/assets/audio/piano/3-b.mp3'),
  40: require('@/assets/audio/piano/4-c.mp3'),
  41: require('@/assets/audio/piano/4-cs.mp3'),
  42: require('@/assets/audio/piano/4-d.mp3'),
  43: require('@/assets/audio/piano/4-ds.mp3'),
  44: require('@/assets/audio/piano/4-e.mp3'),
  45: require('@/assets/audio/piano/4-f.mp3'),
  46: require('@/assets/audio/piano/4-fs.mp3'),
  47: require('@/assets/audio/piano/4-g.mp3'),
  48: require('@/assets/audio/piano/4-gs.mp3'),
  49: require('@/assets/audio/piano/4-a.mp3'),
  50: require('@/assets/audio/piano/4-as.mp3'),
  51: require('@/assets/audio/piano/4-b.mp3'),
  52: require('@/assets/audio/piano/5-c.mp3'),
  53: require('@/assets/audio/piano/5-cs.mp3'),
  54: require('@/assets/audio/piano/5-d.mp3'),
  55: require('@/assets/audio/piano/5-ds.mp3'),
  56: require('@/assets/audio/piano/5-e.mp3'),
  57: require('@/assets/audio/piano/5-f.mp3'),
  58: require('@/assets/audio/piano/5-fs.mp3'),
  59: require('@/assets/audio/piano/5-g.mp3'),
  60: require('@/assets/audio/piano/5-gs.mp3'),
  61: require('@/assets/audio/piano/5-a.mp3'),
  62: require('@/assets/audio/piano/5-as.mp3'),
  63: require('@/assets/audio/piano/5-b.mp3'),
  64: require('@/assets/audio/piano/6-c.mp3'),
} as const;

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

export function getNoteAudioFile(note: number) {
  // @ts-ignore
  return PIANO_AUDIO_FILE_MAP[note] ?? PIANO_AUDIO_FILE_MAP[16];
}

import { useState } from 'react';

export function useMusicInterval(lowest: number, highest: number, maxInterval: number) {
  if (lowest >= highest) {
    throw new Error(`Lowest note must be lower than the highest note ${lowest} - ${highest}`);
  }
  if (lowest < 16 || lowest > 52) {
    // C2 to C5.
    throw new Error(`Invalid lowest note: ${lowest}`);
  }
  if (highest < 28 || highest > 64) {
    // C3 to C6.
    throw new Error(`Invalid highest note: ${highest}`);
  }
  if (maxInterval < 1 || maxInterval > 16) {
    throw new Error(`Invalid max interval: ${maxInterval}`);
  }
  const getRandomInterval = () => {
    const randomLowNote = Math.floor(Math.random() * (highest - lowest) + lowest);
    const calcMaxInterval = Math.min(maxInterval, highest - randomLowNote);
    const randomInterval = Math.floor(Math.random() * calcMaxInterval + 1);
    return {
      lowNote: randomLowNote,
      highNote: randomLowNote + randomInterval,
      interval: randomInterval,
    };
  };

  const [interval, setInterval] = useState({ lowNote: 1, highNote: 2, interval: 1 });

  return {
    interval,
    setInterval,
    getRandomInterval,
  };
}

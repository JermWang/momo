'use client';

import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (): boolean => {
  const [konami, setKonami] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const newKeySequence = [...keySequence, event.key].slice(-KONAMI_CODE.length);
    setKeySequence(newKeySequence);

    if (JSON.stringify(newKeySequence) === JSON.stringify(KONAMI_CODE)) {
      setKonami(true);
    }
  }, [keySequence]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return konami;
};

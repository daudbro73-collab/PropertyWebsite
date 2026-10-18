import { useState, useEffect } from 'react';
import { resolvePropertyImages, isMediaRef } from '../services/propertyMedia.js';

export default function useResolvedImages(sources = []) {
  const key = sources.join('|');
  const [resolved, setResolved] = useState(() =>
    sources.filter((s) => s && !isMediaRef(s))
  );
  const [loading, setLoading] = useState(sources.some(isMediaRef));

  useEffect(() => {
    let cancelled = false;

    if (!sources.length) {
      setResolved([]);
      setLoading(false);
      return undefined;
    }

    if (!sources.some(isMediaRef)) {
      setResolved(sources);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    resolvePropertyImages(sources).then((urls) => {
      if (!cancelled) {
        setResolved(urls.filter(Boolean));
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return { images: resolved.length ? resolved : sources.filter((s) => !isMediaRef(s)), loading };
}

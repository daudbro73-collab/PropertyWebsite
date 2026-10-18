import { useState, useEffect } from 'react';
import { resolveImageSrc, isMediaRef } from '../../services/propertyMedia.js';

export default function PropertyThumb({ src, className, alt = '' }) {
  const [url, setUrl] = useState(isMediaRef(src) ? '' : src);

  useEffect(() => {
    let cancelled = false;
    if (isMediaRef(src)) {
      resolveImageSrc(src).then((resolved) => {
        if (!cancelled) setUrl(resolved);
      });
    } else {
      setUrl(src);
    }
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!url) return <div className={`${className} crm-property-cell__thumb--empty`} />;

  return <img src={url} alt={alt} className={className} />;
}

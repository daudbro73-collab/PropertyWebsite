import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/index.jsx';
import { MAX_PROPERTY_IMAGES, processImageFiles } from '../../utils/processImage.js';
import { storeImageBlobs, resolveImageSrc, isMediaRef } from '../../services/propertyMedia.js';

function ImagePreviewItem({ src, index, total, onRemove, onMove, t }) {
  const [preview, setPreview] = useState(isMediaRef(src) ? '' : src);

  useEffect(() => {
    let cancelled = false;
    if (isMediaRef(src)) {
      resolveImageSrc(src).then((url) => {
        if (!cancelled) setPreview(url);
      });
    } else {
      setPreview(src);
    }
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="crm-image-upload__item">
      <div className="crm-image-upload__thumb">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div className="crm-image-upload__loading" />
        )}
        {index === 0 && <span className="crm-image-upload__cover">{t('crm.image_cover')}</span>}
      </div>
      <div className="crm-image-upload__item-actions">
        <button
          type="button"
          className="crm-image-upload__move"
          disabled={index === 0}
          onClick={() => onMove(index, index - 1)}
          aria-label={t('crm.image_move_left')}
        >
          ←
        </button>
        <button
          type="button"
          className="crm-image-upload__move"
          disabled={index === total - 1}
          onClick={() => onMove(index, index + 1)}
          aria-label={t('crm.image_move_right')}
        >
          →
        </button>
        <button
          type="button"
          className="crm-image-upload__remove"
          onClick={() => onRemove(index)}
          aria-label={t('crm.image_remove')}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function PropertyImageUpload({ images, onChange }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const remaining = MAX_PROPERTY_IMAGES - images.length;
  const canAdd = remaining > 0 && !uploading;

  const handleFiles = async (fileList) => {
    if (!fileList?.length || !canAdd) return;
    setError('');
    setUploading(true);

    try {
      const blobs = await processImageFiles(fileList, images.length);
      if (!blobs.length) {
        setError(t('crm.image_upload_error'));
        return;
      }
      const refs = await storeImageBlobs(blobs);
      onChange([...images, ...refs].slice(0, MAX_PROPERTY_IMAGES));
    } catch {
      setError(t('crm.image_upload_error'));
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (from, to) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="crm-image-upload">
      <div className="crm-image-upload__header">
        <span className="crm-image-upload__count">
          {images.length} / {MAX_PROPERTY_IMAGES}
        </span>
        <span className="crm-image-upload__hint">{t('crm.image_upload_hint')}</span>
      </div>

      {images.length > 0 && (
        <div className="crm-image-upload__grid">
          {images.map((src, index) => (
            <ImagePreviewItem
              key={`${src}-${index}`}
              src={src}
              index={index}
              total={images.length}
              onRemove={handleRemove}
              onMove={handleMove}
              t={t}
            />
          ))}
        </div>
      )}

      {canAdd && (
        <div
          className={`crm-image-upload__dropzone ${dragging ? 'crm-image-upload__dropzone--active' : ''} ${uploading ? 'crm-image-upload__dropzone--loading' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            hidden
            onChange={handleInputChange}
          />
          <div className="crm-image-upload__dropzone-icon">📷</div>
          <p className="crm-image-upload__dropzone-title">
            {uploading ? t('crm.image_uploading') : t('crm.image_drop_title')}
          </p>
          <p className="crm-image-upload__dropzone-sub">
            {t('crm.image_drop_sub').replace('{remaining}', String(remaining))}
          </p>
        </div>
      )}

      {error && <p className="crm-image-upload__error">{error}</p>}
    </div>
  );
}

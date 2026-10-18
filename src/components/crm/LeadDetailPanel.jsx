import { useState } from 'react';
import { useTranslation } from '../../i18n/index.jsx';
import {
  AGENTS,
  LEAD_STATUSES,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  getAgentName,
} from '../../services/crm.js';

export default function LeadDetailPanel({ lead, onClose, onUpdate, onDelete, onAddNote }) {
  const { t } = useTranslation();
  const [noteText, setNoteText] = useState('');

  if (!lead) return null;

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(lead.id, noteText.trim());
    setNoteText('');
  };

  return (
    <div className="crm-detail-overlay" onClick={onClose}>
      <aside className="crm-detail" onClick={(e) => e.stopPropagation()}>
        <div className="crm-detail__header">
          <div>
            <h2>{lead.name}</h2>
            <p>{new Date(lead.createdAt).toLocaleString()}</p>
          </div>
          <button type="button" className="crm-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="crm-detail__section">
          <div className="crm-detail__grid">
            <div>
              <span className="crm-detail__label">{t('crm.email')}</span>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </div>
            <div>
              <span className="crm-detail__label">{t('crm.phone')}</span>
              <a href={`tel:${lead.phone}`}>{lead.phone}</a>
            </div>
            <div>
              <span className="crm-detail__label">{t('crm.property')}</span>
              <span>{lead.propertyTitle || '—'}</span>
            </div>
            <div>
              <span className="crm-detail__label">{t('crm.budget')}</span>
              <span>{lead.budget || '—'}</span>
            </div>
          </div>
        </div>

        <div className="crm-detail__section crm-detail__controls">
          <div className="crm-detail__field">
            <label>{t('crm.status')}</label>
            <select
              className="input select"
              value={lead.status}
              onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`crm.status_${s}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="crm-detail__field">
            <label>{t('crm.assigned_to')}</label>
            <select
              className="input select"
              value={lead.assignedTo}
              onChange={(e) => onUpdate(lead.id, { assignedTo: e.target.value })}
            >
              <option value="">{t('crm.unassigned')}</option>
              {AGENTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crm-detail__field">
            <label>{t('crm.priority')}</label>
            <select
              className="input select"
              value={lead.priority}
              onChange={(e) => onUpdate(lead.id, { priority: e.target.value })}
            >
              {LEAD_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {t(`crm.priority_${p}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="crm-detail__field">
            <label>{t('crm.source')}</label>
            <select
              className="input select"
              value={lead.source}
              onChange={(e) => onUpdate(lead.id, { source: e.target.value })}
            >
              {LEAD_SOURCES.map((s) => (
                <option key={s} value={s}>
                  {t(`crm.source_${s}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {lead.message && (
          <div className="crm-detail__section">
            <span className="crm-detail__label">{t('crm.message')}</span>
            <p className="crm-detail__message">{lead.message}</p>
          </div>
        )}

        <div className="crm-detail__section">
          <span className="crm-detail__label">{t('crm.notes')}</span>
          <form className="crm-detail__note-form" onSubmit={handleNoteSubmit}>
            <textarea
              className="input textarea"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t('crm.note_placeholder')}
              rows={2}
            />
            <button type="submit" className="btn btn--gold btn--sm">
              {t('crm.add_note')}
            </button>
          </form>
          <div className="crm-detail__notes">
            {(lead.notes || []).length === 0 && (
              <p className="crm-detail__empty-notes">{t('crm.no_notes')}</p>
            )}
            {[...(lead.notes || [])].reverse().map((note) => (
              <div key={note.id} className="crm-detail__note">
                <div className="crm-detail__note-meta">
                  <strong>{note.author}</strong>
                  <span>{new Date(note.createdAt).toLocaleString()}</span>
                </div>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="crm-detail__footer">
          <span className="crm-detail__meta">
            {t('crm.assigned_to')}: {getAgentName(lead.assignedTo) || t('crm.unassigned')}
          </span>
          <button type="button" className="crm-table__delete-btn" onClick={() => onDelete(lead.id)}>
            {t('crm.delete')}
          </button>
        </div>
      </aside>
    </div>
  );
}

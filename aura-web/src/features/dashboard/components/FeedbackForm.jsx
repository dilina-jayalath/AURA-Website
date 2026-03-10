import React, { useState } from 'react';
import { FiMessageCircle, FiSmile, FiMeh, FiFrown, FiZap } from 'react-icons/fi';
import { submitFeedback } from '../services/api';
import { useSettings } from '../contexts/SettingsContext';

const STAR_LABELS = { 1: 'Needs improvement', 2: 'Could be better', 3: 'Okay', 4: 'Good', 5: 'Excellent' };

const S = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(2px)', zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  panel: {
    width: 560, minWidth: 560, maxHeight: '88vh', backgroundColor: '#111111',
    borderRadius: 12, border: '2px solid #005317',
    boxShadow: '0 0 60px rgba(0,83,23,0.18)', display: 'flex', flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  panelHeader: {
    padding: '18px 24px', borderBottom: '1px solid rgba(0,83,23,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  },
  badge: {
    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    color: '#005317', backgroundColor: 'transparent', padding: '3px 8px', borderRadius: 4, marginRight: 10, border: '1px solid #005317',
  },
  title: { fontSize: 15, fontWeight: 600, color: '#f1f5f9', margin: 0 },
  closeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 22, color: '#94a3b8', lineHeight: 1, padding: '0 2px',
    display: 'flex', alignItems: 'center',
  },
  body: { padding: '20px 24px', overflowY: 'auto', flex: 1 },
  footer: {
    padding: '14px 24px', borderTop: '1px solid rgba(0,83,23,0.2)',
    display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: '#94a3b8', margin: '16px 0 8px 0',
  },
  sectionLabelFirst: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: '#94a3b8', margin: '0 0 8px 0',
  },
  label: { fontSize: 13, fontWeight: 500, color: '#f1f5f9', marginBottom: 6, display: 'block' },
  select: {
    width: '100%', padding: '9px 12px', fontSize: 13, color: '#f1f5f9',
    backgroundColor: '#1a1a1a', border: '1px solid rgba(0,83,23,0.3)', borderRadius: 8,
    outline: 'none', cursor: 'pointer', fontFamily: 'inherit',
  },
  textarea: {
    width: '100%', padding: '9px 12px', fontSize: 13, color: '#f1f5f9',
    backgroundColor: '#1a1a1a', border: '1px solid rgba(0,83,23,0.3)', borderRadius: 8,
    outline: 'none', resize: 'vertical', minHeight: 80, fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  currentValueBox: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
    backgroundColor: '#0d1a0d', borderRadius: 8, border: '1px solid #005317',
    fontSize: 13, color: '#005317',
  },
  btnPrimary: (disabled) => ({
    padding: '9px 20px', fontSize: 13, fontWeight: 600,
    backgroundColor: disabled ? '#1a1a1a' : '#005317',
    color: disabled ? '#94a3b8' : '#000000',
    border: disabled ? '1px solid rgba(0,83,23,0.2)' : 'none', borderRadius: 8,
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
  }),
  btnGhost: {
    padding: '9px 16px', fontSize: 13, fontWeight: 500,
    backgroundColor: '#1a1a1a', color: '#94a3b8', border: '1px solid rgba(0,83,23,0.2)',
    borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
  },
};

const FEEDBACK_TYPES = [
  { value: 'positive', label: 'Positive', Icon: FiSmile, activeColor: '#065f46', activeBg: '#d1fae5', activeBorder: '#6ee7b7' },
  { value: 'neutral',  label: 'Neutral',  Icon: FiMeh,   activeColor: '#92400e', activeBg: '#fef3c7', activeBorder: '#fcd34d' },
  { value: 'negative', label: 'Negative', Icon: FiFrown, activeColor: '#991b1b', activeBg: '#fee2e2', activeBorder: '#fca5a5' },
];

function FeedbackForm({ userId, onFeedbackSubmitted, onSettingsUpdate }) {
  const { settings, updateSetting, reloadSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    rating: 5, feedbackType: 'positive', comment: '', parameter: 'target_size',
  });

  const getCurrentValue = (param) => settings[param] ?? '';

  const getTimeOfDay = () => {
    const h = new Date().getHours();
    if (h < 6) return 'night';
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    if (h < 22) return 'evening';
    return 'night';
  };

  const reset = () => {
    setForm({ rating: 5, feedbackType: 'positive', comment: '', parameter: 'target_size' });
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const handleRating = (rating) => {
    setForm((prev) => ({
      ...prev, rating,
      feedbackType: rating >= 4 ? 'positive' : rating >= 3 ? 'neutral' : 'negative',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const currentValue = getCurrentValue(form.parameter);
      const result = await submitFeedback(userId, {
        parameter: form.parameter,
        currentValue,
        feedback: {
          type: form.feedbackType, rating: parseInt(form.rating),
          comment: form.comment.trim() || undefined,
          accepted: form.feedbackType === 'positive', responseTime: 2000,
        },
        context: {
          deviceType: 'desktop', timeOfDay: getTimeOfDay(),
          sessionDuration: 60000, interactionCount: 5, pageUrl: window.location.href,
        },
      });
      if (result.data?.nextSuggestion) {
        const s = result.data.nextSuggestion;
        updateSetting(form.parameter, s.suggestedValue);
        setTimeout(() => reloadSettings(), 500);
        if (onSettingsUpdate) onSettingsUpdate({ [form.parameter]: s.suggestedValue, reason: s.reason, confidence: s.confidence });
      }
      reset();
      if (onFeedbackSubmitted) onFeedbackSubmitted(result);
    } catch (err) {
      console.error('Feedback error:', err);
      alert('Failed to submit feedback. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px',
          fontSize: 13, fontWeight: 600, color: '#ffffff',
          backgroundColor: '#005317', border: 'none',
          borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <FiMessageCircle size={14} /> Give Feedback
      </button>

      {isOpen && (
        <div
          style={S.overlay}
          onClick={(e) => { if (e.target === e.currentTarget && !isSubmitting) reset(); }}
        >
          <div style={S.panel}>
            <div style={S.panelHeader}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={S.badge}>FEEDBACK</span>
                <h3 style={S.title}>Share Your Experience</h3>
              </div>
              <button style={S.closeBtn} onClick={() => !isSubmitting && reset()} aria-label="Close">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={S.body}>
                {/* Rating */}
                <div style={S.sectionLabelFirst}>Rating</div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star} type="button" onClick={() => handleRating(star)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: 32, lineHeight: 1, padding: 4,
                          color: star <= form.rating ? '#f59e0b' : '#4a4a4a',
                          transform: star <= form.rating ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.15s',
                        }}
                      >&#9733;</button>
                    ))}
                  </div>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{STAR_LABELS[form.rating]}</span>
                </div>

                {/* Feedback Type */}
                <div style={S.sectionLabel}>Feedback Type</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {FEEDBACK_TYPES.map(({ value, label, Icon, activeColor, activeBg, activeBorder }) => {
                    const active = form.feedbackType === value;
                    return (
                      <button
                        key={value} type="button"
                        onClick={() => setForm((p) => ({ ...p, feedbackType: value }))}
                        style={{
                          flex: 1, padding: '8px 10px', fontSize: 13, fontWeight: active ? 600 : 400,
                          border: `1px solid ${active ? activeBorder : 'rgba(0,83,23,0.3)'}`,
                          backgroundColor: active ? activeBg : '#1a1a1a',
                          color: active ? activeColor : '#94a3b8',
                          borderRadius: 8, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          fontFamily: 'inherit',
                        }}
                      >
                        <Icon size={13} /> {label}
                      </button>
                    );
                  })}
                </div>

                {/* Parameter */}
                <div style={S.sectionLabel}>Parameter</div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>What would you like to give feedback on?</label>
                  <select
                    style={S.select}
                    value={form.parameter}
                    onChange={(e) => setForm((p) => ({ ...p, parameter: e.target.value }))}
                  >
                    <option value="target_size">Button Size</option>
                    <option value="font_size">Font Size</option>
                    <option value="line_height">Line Height</option>
                    <option value="theme">Theme (Light / Dark)</option>
                    <option value="contrast_mode">Contrast Mode</option>
                    <option value="element_spacing">Element Spacing</option>
                  </select>
                </div>

                <div style={S.currentValueBox}>
                  <FiZap size={13} style={{ flexShrink: 0 }} />
                  <span>
                    Current <strong>{form.parameter}</strong>:{' '}
                    <strong>{String(getCurrentValue(form.parameter))}</strong>
                    {' '}&mdash; applied to the entire dashboard
                  </span>
                </div>

                {/* Comment */}
                <div style={{ ...S.sectionLabel, marginTop: 16 }}>
                  Comment{' '}
                  <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 11, color: '#c4c9d1' }}>(optional)</span>
                </div>
                <textarea
                  style={S.textarea}
                  placeholder="Tell us what you think..."
                  value={form.comment}
                  onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                />
              </div>

              <div style={S.footer}>
                <button type="button" onClick={() => !isSubmitting && reset()} style={S.btnGhost} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" style={S.btnPrimary(isSubmitting)} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting\u2026' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackForm;
import React, { useState } from 'react';
import { FiSettings, FiCpu, FiSun, FiMoon } from 'react-icons/fi';
import { useSettings } from '../contexts/SettingsContext';
import { submitFeedback, updateManualSettings } from '../services/api';

const S = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(2px)', zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  panel: {
    width: 620, minWidth: 620, maxHeight: '88vh', backgroundColor: '#111111',
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
    color: '#94a3b8', margin: '20px 0 12px 0',
  },
  sectionLabelFirst: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: '#94a3b8', margin: '0 0 12px 0',
  },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 500, color: '#f1f5f9', marginBottom: 6, display: 'block' },
  labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  valueTag: {
    fontSize: 12, color: '#005317', backgroundColor: 'transparent',
    padding: '2px 8px', borderRadius: 4, border: '1px solid #005317',
  },
  select: {
    width: '100%', padding: '9px 12px', fontSize: 13, color: '#f1f5f9',
    backgroundColor: '#1a1a1a', border: '1px solid rgba(0,83,23,0.3)', borderRadius: 8,
    outline: 'none', cursor: 'pointer', fontFamily: 'inherit',
  },
  range: { width: '100%', accentColor: '#005317', cursor: 'pointer', display: 'block' },
  rangeTicks: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 11, color: '#94a3b8', marginTop: 4, padding: '0 2px',
  },
  seg: (active) => ({
    flex: 1, padding: '8px 10px', fontSize: 13, fontWeight: active ? 600 : 400,
    border: `1px solid ${active ? '#005317' : 'rgba(0,83,23,0.2)'}`,
    backgroundColor: active ? '#005317' : '#1a1a1a',
    color: active ? '#000000' : '#94a3b8',
    borderRadius: 8, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    fontFamily: 'inherit',
  }),
  toggleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 0', borderBottom: '1px solid rgba(0,83,23,0.1)',
  },
  toggleLabel: { fontSize: 13, fontWeight: 500, color: '#f1f5f9' },
  previewBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 14px', backgroundColor: '#0d1a0d', borderRadius: 8,
    border: '1px solid rgba(0,83,23,0.3)', marginBottom: 20,
  },
  colorRow: { display: 'flex', gap: 12 },
  colorItem: { flex: 1 },
  colorLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 6, display: 'block' },
  colorInput: { width: '100%', height: 38, borderRadius: 8, border: '1px solid rgba(0,83,23,0.3)', cursor: 'pointer', padding: 0, backgroundColor: '#1a1a1a' },
  infoBox: {
    display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px',
    backgroundColor: '#0d1a0d', borderRadius: 8, border: '1px solid #005317',
    marginTop: 16, fontSize: 13, color: '#005317',
  },
  btnPrimary: (disabled) => ({
    padding: '9px 20px', fontSize: 13, fontWeight: 600,
    backgroundColor: disabled ? '#1a1a1a' : '#005317',
    color: disabled ? '#94a3b8' : '#000000',
    border: disabled ? '1px solid rgba(0,83,23,0.2)' : 'none', borderRadius: 8,
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
  }),
};

function Toggle({ checked, onChange, disabled }) {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: 42, height: 24, borderRadius: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: checked ? '#005317' : '#2a2a2a',
        position: 'relative', transition: 'background-color 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: checked ? 21 : 3,
        width: 18, height: 18, borderRadius: '50%', backgroundColor: '#f1f5f9',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function ManualSettingsControl({ userId, onSettingChange }) {
  const { settings, updateSetting, isPreviewEnabled, setIsPreviewEnabled } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getTimeOfDay = () => {
    const h = new Date().getHours();
    if (h < 6) return 'night';
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    if (h < 22) return 'evening';
    return 'night';
  };

  const handleManualChange = async (parameter, newValue) => {
    const oldValue = settings[parameter];
    if (oldValue === newValue) return;
    setIsSaving(true);
    try {
      updateSetting(parameter, newValue);
      const nextSettings = { ...settings, [parameter]: newValue };
      await updateManualSettings(userId, {
        enabled: true,
        font_size: nextSettings.font_size,
        line_height: nextSettings.line_height,
        contrast_mode: nextSettings.contrast_mode,
        element_spacing: nextSettings.element_spacing,
        target_size: nextSettings.target_size,
        theme: nextSettings.theme,
        reduced_motion: nextSettings.reduced_motion ?? false,
        tooltip_assist: nextSettings.tooltip_assist ?? false,
        layout_simplification: nextSettings.layout_simplification ?? false,
        primary_color: nextSettings.primary_color,
        secondary_color: nextSettings.secondary_color,
        accent_color: nextSettings.accent_color,
      });
      await submitFeedback(userId, {
        parameter,
        currentValue: oldValue,
        feedback: {
          type: 'positive', rating: 5,
          comment: `User manually changed ${parameter} from ${oldValue} to ${newValue}`,
          accepted: true, responseTime: 0, isManualSelection: true,
        },
        context: {
          deviceType: 'desktop', timeOfDay: getTimeOfDay(),
          sessionDuration: 60000, interactionCount: 1,
          pageUrl: window.location.href, source: 'manual_control',
        },
        optimization: { parameter, oldValue, newValue, suggestedBy: 'user_manual' },
      });
      if (onSettingChange) onSettingChange({ parameter, oldValue, newValue });
    } catch (error) {
      console.error('[ManualSettings] Error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px',
          fontSize: 13, fontWeight: 500, color: '#ffffff',
          backgroundColor: '#111111', border: '1px solid #005317',
          borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <FiSettings size={14} /> Manual Settings
      </button>

      {isOpen && (
        <div
          style={S.overlay}
          onClick={(e) => { if (e.target === e.currentTarget && !isSaving) setIsOpen(false); }}
        >
          <div style={S.panel}>
            <div style={S.panelHeader}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={S.badge}>SETTINGS</span>
                <h3 style={S.title}>Interface Configuration</h3>
              </div>
              <button style={S.closeBtn} onClick={() => !isSaving && setIsOpen(false)} aria-label="Close">
                &times;
              </button>
            </div>

            <div style={S.body}>
              {/* Preview toggle */}
              <div style={S.previewBar}>
                <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>Preview on Dashboard</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                    If disabled, changes apply to the client but won&apos;t affect this dashboard
                  </div>
                </div>
                <Toggle checked={isPreviewEnabled} onChange={setIsPreviewEnabled} disabled={isSaving} />
              </div>

              {/* Typography */}
              <div style={S.sectionLabelFirst}>Typography</div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Font Size</span>
                  <span style={S.valueTag}>{settings.font_size}</span>
                </div>
                <select
                  style={S.select}
                  value={settings.font_size}
                  onChange={(e) => handleManualChange('font_size', Number(e.target.value))}
                  disabled={isSaving}
                >
                  <option value={14}>Small � 14px</option>
                  <option value={16}>Medium � 16px</option>
                  <option value={18}>Large � 18px</option>
                  <option value={20}>X-Large � 20px</option>
                </select>
              </div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Line Height</span>
                  <span style={S.valueTag}>{settings.line_height}</span>
                </div>
                <input
                  type="range" min="1.2" max="2.0" step="0.1"
                  value={settings.line_height} style={S.range}
                  onChange={(e) => handleManualChange('line_height', Number(e.target.value))}
                  disabled={isSaving}
                />
                <div style={S.rangeTicks}><span>1.2</span><span>1.5</span><span>1.8</span><span>2.0</span></div>
              </div>

              {/* Interaction */}
              <div style={S.sectionLabel}>Interaction</div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Button / Touch Target Size</span>
                  <span style={S.valueTag}>{settings.target_size}px</span>
                </div>
                <input
                  type="range" min="24" max="48" step="4"
                  value={settings.target_size} style={S.range}
                  onChange={(e) => handleManualChange('target_size', Number(e.target.value))}
                  disabled={isSaving}
                />
                <div style={S.rangeTicks}><span>24px</span><span>32px</span><span>40px</span><span>48px</span></div>
              </div>

              {/* Appearance */}
              <div style={S.sectionLabel}>Appearance</div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Theme</span>
                  <span style={S.valueTag}>{settings.theme}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={S.seg(settings.theme === 'light')} onClick={() => handleManualChange('theme', 'light')} disabled={isSaving}>
                    <FiSun size={13} /> Light
                  </button>
                  <button style={S.seg(settings.theme === 'dark')} onClick={() => handleManualChange('theme', 'dark')} disabled={isSaving}>
                    <FiMoon size={13} /> Dark
                  </button>
                </div>
              </div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Contrast Mode</span>
                  <span style={S.valueTag}>{settings.contrast_mode}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={S.seg(settings.contrast_mode === 'normal')} onClick={() => handleManualChange('contrast_mode', 'normal')} disabled={isSaving}>Normal</button>
                  <button style={S.seg(settings.contrast_mode === 'high')} onClick={() => handleManualChange('contrast_mode', 'high')} disabled={isSaving}>High Contrast</button>
                </div>
              </div>

              <div style={S.fieldGroup}>
                <div style={S.labelRow}>
                  <span style={S.label}>Element Spacing</span>
                  <span style={S.valueTag}>{settings.element_spacing}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={S.seg(settings.element_spacing === 'compact')} onClick={() => handleManualChange('element_spacing', 'compact')} disabled={isSaving}>Compact</button>
                  <button style={S.seg(settings.element_spacing === 'normal')} onClick={() => handleManualChange('element_spacing', 'normal')} disabled={isSaving}>Normal</button>
                  <button style={S.seg(settings.element_spacing === 'spacious')} onClick={() => handleManualChange('element_spacing', 'spacious')} disabled={isSaving}>Spacious</button>
                </div>
              </div>

              {/* Accessibility */}
              <div style={S.sectionLabel}>Accessibility</div>

              <div style={S.toggleRow}>
                <span style={S.toggleLabel}>Reduced Motion</span>
                <Toggle checked={settings.reduced_motion || false} onChange={(v) => handleManualChange('reduced_motion', v)} disabled={isSaving} />
              </div>
              <div style={S.toggleRow}>
                <span style={S.toggleLabel}>Tooltip Assist</span>
                <Toggle checked={settings.tooltip_assist || false} onChange={(v) => handleManualChange('tooltip_assist', v)} disabled={isSaving} />
              </div>
              <div style={{ ...S.toggleRow, borderBottom: 'none' }}>
                <span style={S.toggleLabel}>Layout Simplification</span>
                <Toggle checked={settings.layout_simplification || false} onChange={(v) => handleManualChange('layout_simplification', v)} disabled={isSaving} />
              </div>

              {/* Branding */}
              <div style={S.sectionLabel}>Branding Colours</div>
              <div style={S.colorRow}>
                <div style={S.colorItem}>
                  <span style={S.colorLabel}>Primary</span>
                  <input type="color" style={S.colorInput} value={settings.primary_color || '#007bff'} onChange={(e) => handleManualChange('primary_color', e.target.value)} disabled={isSaving} />
                </div>
                <div style={S.colorItem}>
                  <span style={S.colorLabel}>Secondary</span>
                  <input type="color" style={S.colorInput} value={settings.secondary_color || '#6c757d'} onChange={(e) => handleManualChange('secondary_color', e.target.value)} disabled={isSaving} />
                </div>
                <div style={S.colorItem}>
                  <span style={S.colorLabel}>Accent</span>
                  <input type="color" style={S.colorInput} value={settings.accent_color || '#28a745'} onChange={(e) => handleManualChange('accent_color', e.target.value)} disabled={isSaving} />
                </div>
              </div>

              <div style={S.infoBox}>
                <FiCpu size={14} style={{ marginTop: 1, flexShrink: 0 }} />
                <span>The RL model learns from your manual choices as strong positive feedback signals.</span>
              </div>
            </div>

            <div style={S.footer}>
              <button
                onClick={() => !isSaving && setIsOpen(false)}
                style={S.btnPrimary(isSaving)}
                disabled={isSaving}
              >
                {isSaving ? 'Saving\u2026' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManualSettingsControl;
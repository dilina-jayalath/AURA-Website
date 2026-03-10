import React from 'react';
import { FiSettings, FiZap } from 'react-icons/fi';
import { useSettings } from '../contexts/SettingsContext';

const SETTING_LABELS = {
  font_size: 'Font Size',
  target_size: 'Button Size',
  line_height: 'Line Height',
  theme: 'Theme',
  contrast_mode: 'Contrast',
  element_spacing: 'Spacing',
  element_spacing_x: 'Spacing X',
  element_spacing_y: 'Spacing Y',
  element_padding_x: 'Padding X',
  element_padding_y: 'Padding Y',
  reduced_motion: 'Reduced Motion',
  tooltip_assist: 'Tooltip Assist',
  layout_simplification: 'Simplified Layout',
  primary_color: 'Primary Color',
  secondary_color: 'Secondary Color',
  accent_color: 'Accent Color',
};

function SettingTile({ label, value }) {
  const isColor = typeof value === 'string' && /^#[0-9a-f]{3,6}$/i.test(value);
  const isBool = typeof value === 'boolean';
  return (
    <div className="stat bg-base-200 rounded-lg p-4">
      <div className="stat-title">{label}</div>
      {isColor ? (
        <div className="flex items-center gap-2 mt-1">
          <span
            className="inline-block w-6 h-6 rounded border border-base-content/20"
            style={{ backgroundColor: value }}
          />
          <span className="stat-value text-lg">{value}</span>
        </div>
      ) : (
        <div className={`stat-value text-2xl capitalize ${isBool ? (value ? 'text-success' : 'text-error') : ''}`}>
          {isBool ? (value ? 'On' : 'Off') : String(value ?? '—')}
          {typeof value === 'number' && label.toLowerCase().includes('size') ? 'px' : ''}
        </div>
      )}
    </div>
  );
}

function SettingsDisplay() {
  const { settings } = useSettings();

  const entries = Object.entries(SETTING_LABELS)
    .filter(([key]) => settings[key] !== undefined && settings[key] !== null)
    .map(([key, label]) => ({ key, label, value: settings[key] }));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl flex items-center gap-2"><FiSettings /> Active Settings (Live)</h2>
        <div className="grid grid-cols-3 gap-4">
          {entries.map(({ key, label, value }) => (
            <SettingTile key={key} label={label} value={value} />
          ))}
        </div>
        <div className="alert alert-success mt-4">
          <span className="flex items-center gap-2"><FiZap /> These settings are applied to the entire website in real-time!</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsDisplay;

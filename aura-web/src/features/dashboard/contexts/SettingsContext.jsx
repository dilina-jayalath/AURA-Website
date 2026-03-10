import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children, userId = 'u_001' }) {
  const DEFAULT_SETTINGS = {
    font_size: 16,
    target_size: 32,
    line_height: 1.5,
    theme: 'light',
    contrast_mode: 'normal',
    element_spacing: 8
  };

  const CACHE_KEY = `aura_settings_${userId}`;

  // Initialize from localStorage cache immediately (for fast startup)
  const getCachedSettings = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) { /* ignore */ }
    return null;
  };

  const cachedOnStartup = getCachedSettings();
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, ...(cachedOnStartup || {}) });
  const [frozenSettings, setFrozenSettings] = useState({ ...DEFAULT_SETTINGS, ...(cachedOnStartup || {}) });
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user settings from backend on mount
  useEffect(() => {
    loadUserSettings();
  }, [userId]);

  // Subscribe to real-time settings changes via SSE (receives changes from Novacart feedback)
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || (window.location.origin + '/api');
    const url = `${API_BASE_URL}/settings/events/${userId}`;
    let es = null;
    let retryTimer = null;

    function connect() {
      es = new EventSource(url);
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'settings_update' && data.settings) {
            setSettings(prev => {
              const updated = { ...prev, ...data.settings };
              try { localStorage.setItem(CACHE_KEY, JSON.stringify(updated)); } catch {}
              return updated;
            });
            console.log('[Dashboard SSE] Settings received from:', data.source);
          }
        } catch {}
      };
      es.onerror = () => {
        es.close();
        retryTimer = setTimeout(connect, 5000);
      };
    }

    connect();
    return () => {
      if (es) es.close();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [userId]);

  // Apply initial settings on mount
  useEffect(() => {
    console.log('[Settings] Initial mount - applying default settings');
    applyAllSettings(settings);
  }, []);

  const loadUserSettings = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || (window.location.origin + '/api');
      // Use the settings endpoint (GET /api/settings/:userId) which reads from UserSettings collection
      const response = await fetch(`${API_BASE_URL}/settings/${userId}`);
      const data = await response.json();

      if (data.found && data.profile) {
        const mergedSettings = data.profile;

        console.log('[Settings] Backend settings:', mergedSettings);

        // Save merged settings to localStorage cache for fast startup
        const cacheKey = `aura_settings_${userId}`;
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ ...DEFAULT_SETTINGS, ...mergedSettings }));
        } catch (e) { /* ignore storage errors */ }

        setSettings(prev => ({
          ...prev,
          ...mergedSettings
        }));

        console.log('[Settings] Loaded user settings from DB');
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load user settings:', error);
      setIsLoaded(true);
    }
  };

  // Apply settings to DOM whenever they change OR preview mode changes
  useEffect(() => {
    console.log('[Settings] Settings/Preview changed, applying to DOM');
    if (isPreviewEnabled) {
      applyAllSettings(settings);
    } else {
      // Use frozen settings when preview is disabled to maintain dashboard appearance
      applyAllSettings(frozenSettings);
    }
  }, [settings, isPreviewEnabled, frozenSettings]);

  const applyAllSettings = (newSettings) => {
    console.log('[Settings] Applying all settings to website:', newSettings);

    // Ensure DOM is ready
    if (!document.body) {
      console.warn('[Settings] DOM not ready, skipping settings application');
      return;
    }

    // Font Size - handle both numeric (16) and legacy string ('medium') values
    if (newSettings.font_size !== undefined && newSettings.font_size !== null) {
      let size;
      if (typeof newSettings.font_size === 'number') {
        size = `${newSettings.font_size}px`;
      } else {
        // Legacy string fallback
        const fontSizeMap = {
          'small': '14px',
          'medium': '16px',
          'large': '18px',
          'x-large': '20px'
        };
        size = fontSizeMap[newSettings.font_size] || '16px';
      }

      const style = document.createElement('style');
      style.id = 'rl-fontSize-override';
      const oldStyle = document.getElementById('rl-fontSize-override');
      if (oldStyle) oldStyle.remove();

      style.textContent = `
        html, body, * {
          font-size: ${size} !important;
        }
      `;
      document.head.appendChild(style);
      console.log(`[Settings] Applied fontSize: ${size}`);
    }

    // Target/Button Size
    if (newSettings.target_size) {
      const size = Number(newSettings.target_size);

      const style = document.createElement('style');
      style.id = 'rl-targetSize-override';
      const oldStyle = document.getElementById('rl-targetSize-override');
      if (oldStyle) oldStyle.remove();

      style.textContent = `
        .btn, button {
          min-height: ${size}px !important;
          padding: ${size / 4}px ${size / 2}px !important;
        }
      `;
      document.head.appendChild(style);
      console.log(`[Settings] Applied targetSize: ${size}px`);
    }

    // Line Height
    if (newSettings.line_height) {
      const lineHeight = Number(newSettings.line_height);

      const style = document.createElement('style');
      style.id = 'rl-lineHeight-override';
      const oldStyle = document.getElementById('rl-lineHeight-override');
      if (oldStyle) oldStyle.remove();

      style.textContent = `
        html, body, * {
          line-height: ${lineHeight} !important;
        }
      `;
      document.head.appendChild(style);
      console.log(`[Settings] Applied lineHeight: ${lineHeight}`);
    }

    // Theme - DaisyUI requires 'data-theme' on html element
    if (newSettings.theme) {
      const html = document.documentElement;
      html.setAttribute('data-theme', newSettings.theme);
      // Force DaisyUI theme refresh
      html.className = html.className; // Trigger re-render
      console.log(`[Settings] Applied theme: ${newSettings.theme}`);
    }

    // Contrast Mode
    if (newSettings.contrast_mode) {
      document.documentElement.setAttribute('data-contrast', newSettings.contrast_mode);

      const style = document.createElement('style');
      style.id = 'rl-contrast-override';
      const oldStyle = document.getElementById('rl-contrast-override');
      if (oldStyle) oldStyle.remove();

      if (newSettings.contrast_mode === 'high') {
        style.textContent = `
          body {
            filter: contrast(1.5) !important;
          }
        `;
        document.head.appendChild(style);
      }
      console.log(`[Settings] Applied contrast_mode: ${newSettings.contrast_mode}`);
    }

    // Element Spacing
    if (newSettings.element_spacing) {
      const spacingMap = {
        compact: '0.25rem',
        normal: '0.5rem',
        spacious: '1rem'
      };
      const spacing = spacingMap[newSettings.element_spacing] || '0.5rem';

      const style = document.createElement('style');
      style.id = 'rl-spacing-override';
      const oldStyle = document.getElementById('rl-spacing-override');
      if (oldStyle) oldStyle.remove();

      style.textContent = `
        .gap-2, .gap-4, .gap-6, .space-y-4, .space-y-6 {
          gap: ${spacing} !important;
        }
      `;
      document.head.appendChild(style);
      console.log(`[Settings] Applied elementSpacing: ${spacing}`);
    }

    // Branding Colors
    if (newSettings.primary_color) {
      document.documentElement.style.setProperty('--p', hexToHsl(newSettings.primary_color));
      console.log(`[Settings] Applied primaryColor: ${newSettings.primary_color}`);
    }
    if (newSettings.secondary_color) {
      document.documentElement.style.setProperty('--s', hexToHsl(newSettings.secondary_color));
      console.log(`[Settings] Applied secondaryColor: ${newSettings.secondary_color}`);
    }
    if (newSettings.accent_color) {
      document.documentElement.style.setProperty('--a', hexToHsl(newSettings.accent_color));
      console.log(`[Settings] Applied accentColor: ${newSettings.accent_color}`);
    }

    // Reduced Motion
    if (newSettings.reduced_motion) {
      const style = document.createElement('style');
      style.id = 'rl-motion-override';
      const oldStyle = document.getElementById('rl-motion-override');
      if (oldStyle) oldStyle.remove();

      style.textContent = `
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
      console.log('[Settings] Applied reducedMotion: true');
    } else {
      const oldStyle = document.getElementById('rl-motion-override');
      if (oldStyle) oldStyle.remove();
    }

    console.log('[Settings] All settings applied successfully');
  };

  // Helper to convert Hex to HSL for DaisyUI
  const hexToHsl = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt('0x' + hex[1] + hex[1]);
      g = parseInt('0x' + hex[2] + hex[2]);
      b = parseInt('0x' + hex[3] + hex[3]);
    } else if (hex.length === 7) {
      r = parseInt('0x' + hex[1] + hex[2]);
      g = parseInt('0x' + hex[3] + hex[4]);
      b = parseInt('0x' + hex[5] + hex[6]);
    }
    // Convert to HSL
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    // DaisyUI expects just the numbers "H S% L%" for --p, --s etc.
    return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  const updateSetting = (parameter, value) => {
    console.log(`[Settings] Updating ${parameter} to ${value}`);

    setSettings(prev => {
      const updated = { ...prev, [parameter]: value };
      // Persist to localStorage so settings survive reload and sync to other apps
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(updated)); } catch (e) { }
      return updated;
    });

    document.body.style.transition = 'opacity 0.3s';
    document.body.style.opacity = '0.8';
    setTimeout(() => { document.body.style.opacity = '1'; }, 300);
  };

  const updateMultipleSettings = (newSettings) => {
    console.log('[Settings] Updating multiple settings:', newSettings);

    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      // Persist to localStorage
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(updated)); } catch (e) { }
      return updated;
    });

    document.body.style.transition = 'opacity 0.3s';
    document.body.style.opacity = '0.7';
    setTimeout(() => { document.body.style.opacity = '1'; }, 300);
  };

  const resetSettings = () => {
    setSettings({
      font_size: 16,
      target_size: 32,
      line_height: 1.5,
      theme: 'light',
      contrast_mode: 'normal',
      element_spacing: 8
    });
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      updateMultipleSettings,
      resetSettings,
      reloadSettings: loadUserSettings,
      isLoaded,
      isPreviewEnabled,
      setIsPreviewEnabled: (enabled) => {
        if (!enabled) {
          console.log('[Settings] Freezing settings for dashboard preview off');
          setFrozenSettings(settings);
        }
        setIsPreviewEnabled(enabled);
      }
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

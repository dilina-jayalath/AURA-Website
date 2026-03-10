import { useState, useEffect, useCallback, useRef } from 'react';
import { applySettings, getSettingsHistory, undoChange, redoChange } from '../services/api';

// Map raw API source values to the three display categories
const SOURCE_MAP = {
  rl_optimization: 'ml', ml_profile: 'ml', ml_suggestion_accepted: 'ml',
  ml: 'ml', rl: 'ml', category: 'ml', 'rule-based-fallback': 'ml',
  user_manual: 'manual', dashboard: 'manual', manual: 'manual',
  extension: 'manual', revert: 'manual',
  reset: 'system', undo: 'system', redo: 'system',
  system: 'system', fallback: 'system', sse: 'system',
};

function normalizeItem(item) {
  const source = SOURCE_MAP[item.source] || 'system';
  const paramLabel = item.parameter ? item.parameter.replace(/_/g, ' ') : null;
  const name = paramLabel
    ? `${paramLabel}: ${item.oldValue ?? '—'} → ${item.newValue ?? '—'}`
    : `Change (${item.source || 'system'})`;
  return {
    id: item.id,
    name,
    timestamp: item.timestamp,
    source,
    description: `Source: ${item.source || 'system'}${item.isUndone ? ' (undone)' : ''}`,
    settings: item.snapshot || {},
    parameter: item.parameter,
    oldValue: item.oldValue,
    newValue: item.newValue,
    isUndone: item.isUndone,
  };
}

export function useHistory(userId) {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [stats, setStats] = useState({
    totalChanges: 0,
    mlChanges: 0,
    manualChanges: 0,
    currentVersion: 0,
  });
  const loadingRef = useRef(false);

  const loadHistory = useCallback(async () => {
    if (!userId || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const raw = await getSettingsHistory(userId, 100);
      if (raw.length > 0) {
        const normalized = raw.map(normalizeItem);
        setHistory(normalized);
        // Point currentIndex at the latest non-undone entry
        const activeIdx = normalized.reduce((best, item, i) => (!item.isUndone ? i : best), -1);
        setCurrentIndex(activeIdx >= 0 ? activeIdx : normalized.length - 1);
      } else {
        setHistory([]);
        setCurrentIndex(-1);
      }
    } catch {
      // leave whatever was already set
    } finally {
      loadingRef.current = false;
    }
  }, [userId]);

  // Fetch from API on mount and whenever userId changes
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Refresh every 30 s to pick up RL / external changes
  useEffect(() => {
    const interval = setInterval(loadHistory, 30000);
    return () => clearInterval(interval);
  }, [loadHistory]);

  // Update stats whenever history changes
  useEffect(() => {
    const mlChanges = history.filter(h => h.source === 'ml').length;
    const manualChanges = history.filter(h => h.source === 'manual').length;
    setStats({
      totalChanges: history.length,
      mlChanges,
      manualChanges,
      currentVersion: currentIndex + 1,
    });
  }, [history, currentIndex]);

  // addChange: optimistically insert while the API persists in the background
  const addChange = useCallback((settings, source = 'manual', name, description) => {
    const displaySource = SOURCE_MAP[source] || 'manual';
    const newChange = {
      id: Date.now(),
      name: name || `Change ${history.length + 1}`,
      timestamp: new Date().toISOString(),
      source: displaySource,
      description: description || `Source: ${source}`,
      settings: { ...settings },
    };
    const newHistory = [...history.slice(0, currentIndex + 1), newChange];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    return newChange;
  }, [history, currentIndex]);

  const undo = useCallback(async () => {
    try {
      const result = await undoChange(userId);
      if (result.success) {
        await loadHistory();
        return { success: true, name: 'Undo applied', settings: result.restoredSettings };
      }
      return { success: false, error: result.error || 'Nothing to undo' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [userId, loadHistory]);

  const redo = useCallback(async () => {
    try {
      const result = await redoChange(userId);
      if (result.success) {
        await loadHistory();
        return { success: true, name: 'Redo applied', settings: result.restoredSettings };
      }
      return { success: false, error: result.error || 'Nothing to redo' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [userId, loadHistory]);

  const revertToVersion = useCallback(async (index) => {
    if (index < 0 || index >= history.length) {
      return { success: false, error: 'Invalid version index' };
    }
    const targetState = history[index];
    try {
      await applySettings(userId, targetState.settings, 'revert');
      await loadHistory();
      return { success: true, timestamp: targetState.timestamp, settings: targetState.settings };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [history, userId, loadHistory]);

  const currentSettings = history[currentIndex]?.settings || null;
  const canUndo = history.some(h => !h.isUndone) && currentIndex > 0;
  const canRedo = history.some(h => h.isUndone);

  return {
    history,
    currentIndex,
    currentSettings,
    canUndo,
    canRedo,
    undo,
    redo,
    revertToVersion,
    addChange,
    refreshHistory: loadHistory,
    stats
  };
}

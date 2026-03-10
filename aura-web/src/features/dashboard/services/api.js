import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Notify the AURA extension (if installed) about a settings change.
 * The extension broadcasts to all tabs, giving novacart instant updates
 * even when SSE isn't connected.
 */
function notifyExtension(userId, settings) {
  try {
    window.postMessage({
      type: 'AURA_EXT_SET_ADAPTIVE_PROFILE',
      source: 'aura-web',
      profile: {
        user_id: userId,
        metadata: { origin: 'user', created_at: new Date().toISOString(), confidence_overall: 1, version: 1 },
        profile: settings,
      },
    }, '*');
  } catch { /* extension not available */ }
}

export async function fetchUserData(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Return mock data for development
    return {
      userId,
      currentSettings: {
        font_size: 16,
        theme: 'light',
        contrast_mode: 'normal',
        line_height: 1.5,
        target_size: 32
      },
      mlProfile: {},
      lastActive: new Date().toISOString()
    };
  }
}

export async function applySettings(userId, settings, source = 'manual') {
  try {
    // POST to the SSE-broadcasting settings endpoint so Novacart tabs update in real-time
    const response = await axios.post(`${API_BASE_URL}/settings/${userId}`, {
      settings,
      source
    });
    // Also push to extension so all tabs get notified via PING-PONG
    notifyExtension(userId, response.data.profile || settings);
    return response.data.profile || settings;
  } catch (error) {
    console.error('Error applying settings:', error);
    return settings;
  }
}

export async function exportHistory(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/history/export`);
    return response.data.data;
  } catch (error) {
    console.error('Error exporting history:', error);
    throw error;
  }
}

export async function submitFeedback(userId, feedbackData) {
  try {
    // Pass through the complete MongoDB schema structure from FeedbackForm
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/feedback`, feedbackData);
    return response.data.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

export async function getFeedbackHistory(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/feedback`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching feedback history:', error);
    return [];
  }
}

export async function clearHistory(userId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
}

export async function fetchEffectiveProfile(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/personalization/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching effective profile:', error);
    throw error;
  }
}

export async function fetchTrialPreferences(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/trials/preferences/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trial preferences:', error);
    throw error;
  }
}

export async function updateManualSettings(userId, settings) {
  try {
    // Use the SSE-broadcasting settings endpoint so Novacart tabs update in real-time
    const response = await axios.post(`${API_BASE_URL}/settings/${userId}`, {
      settings,
      source: 'dashboard'
    });
    // Also push to extension so all tabs get notified via PING-PONG
    notifyExtension(userId, response.data.profile || settings);
    return response.data.profile || settings;
  } catch (error) {
    console.error('Error updating manual settings:', error);
    throw error;
  }
}

// Alias for updating user settings (same as applySettings)
export async function updateUserSettings(userId, settings) {
  return applySettings(userId, settings, 'rl');
}

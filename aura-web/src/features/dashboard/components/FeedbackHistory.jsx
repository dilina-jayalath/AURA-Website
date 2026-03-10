import React, { useState, useEffect } from 'react';
import { FiSmile, FiFrown, FiMeh, FiMessageCircle, FiCheck, FiClock, FiEye, FiX, FiStar, FiZap, FiArrowRight } from 'react-icons/fi';
import { getFeedbackHistory } from '../services/api';

function FeedbackHistory({ userId, refreshKey }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, [userId, refreshKey]);

  const loadFeedback = async () => {
    setLoading(true);
    try {
      // Load from MongoDB via API
      const data = await getFeedbackHistory(userId);
      console.log('Fetched feedback from API:', data);
      
      // Use MongoDB data directly (already in correct schema format)
      setFeedbackList(data);
    } catch (error) {
      console.error('Error loading feedback:', error);
      // Fallback to mock data if API fails
      setFeedbackList(getMockFeedback());
    } finally {
      setLoading(false);
    }
  };

  const getMockFeedback = () => {
    return [
      {
        _id: '1',
        userId: 'demo',
        optimization: { parameter: 'theme', oldValue: 'light', newValue: 'dark', suggestedBy: 'rl' },
        feedback: { type: 'positive', rating: 5, comment: 'Love the new dark theme! Much easier on my eyes.', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
        reward: { value: 1.4, normalized: 1 },
        processed: true,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        _id: '2',
        userId: 'demo',
        optimization: { parameter: 'font_size', oldValue: 14, newValue: 18, suggestedBy: 'rl' },
        feedback: { type: 'neutral', rating: 4, comment: 'Font size is better but could be a bit larger', timestamp: new Date(Date.now() - 86400000).toISOString() },
        reward: { value: 0.4, normalized: 0.4 },
        processed: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: '3',
        userId: 'demo',
        optimization: { parameter: 'target_size', oldValue: 24, newValue: 32, suggestedBy: 'rl' },
        feedback: { type: 'negative', rating: 3, comment: 'Buttons are still too small for me to click accurately', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
        reward: { value: -0.6, normalized: -0.6 },
        processed: false,
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ];
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'positive': return <FiSmile />;
      case 'negative': return <FiFrown />;
      case 'neutral': return <FiMeh />;
      default: return <FiMessageCircle />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      applied: { class: 'badge-success', text: 'Applied', icon: <FiCheck /> },
      pending: { class: 'badge-ghost', text: 'Pending', icon: <FiClock /> },
      acknowledged: { class: 'badge-info', text: 'Acknowledged', icon: <FiEye /> },
      ignored: { class: 'badge-error', text: 'Ignored', icon: <FiX /> }
    };
    return badges[status] || badges.acknowledged;
  };

  const getImpactBadge = (reward) => {
    const val = Math.abs(Number(reward ?? 0));
    if (val >= 1.0) return { class: 'badge-error', text: 'High' };
    if (val >= 0.4) return { class: 'badge-warning', text: 'Medium' };
    return { class: 'badge-success', text: 'Low' };
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <FiStar
            key={index}
            className={index < rating ? 'text-base-content' : 'text-base-content/40'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const stats = {
    total: feedbackList.length,
    positive: feedbackList.filter(f => f.feedback?.type === 'positive').length,
    negative: feedbackList.filter(f => f.feedback?.type === 'negative').length,
    neutral: feedbackList.filter(f => f.feedback?.type === 'neutral').length,
    applied: feedbackList.filter(f => f.processed === true).length,
    pending: feedbackList.filter(f => f.processed === false).length,
    avgRating: feedbackList.length > 0 
      ? (feedbackList.reduce((sum, f) => sum + (f.feedback?.rating || 0), 0) / feedbackList.length).toFixed(1)
      : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow">
          <div className="card-body p-4 text-center">
            <div className="text-3xl font-bold text-base-content">{stats.total}</div>
            <div className="text-sm opacity-70">Total Feedback</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body p-4 text-center">
            <div className="text-3xl font-bold text-base-content flex items-center justify-center gap-2"><FiStar /> {stats.avgRating}</div>
            <div className="text-sm opacity-70">Avg Rating</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body p-4 text-center">
            <div className="text-3xl font-bold text-success">{stats.applied}</div>
            <div className="text-sm opacity-70">Applied</div>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body p-4 text-center">
            <div className="text-3xl font-bold text-base-content">{stats.pending}</div>
            <div className="text-sm opacity-70">Pending</div>
          </div>
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="card bg-base-200 shadow">
        <div className="card-body p-4">
          <h3 className="text-sm font-semibold mb-2">Sentiment Distribution</h3>
          <div className="flex h-8 rounded-lg overflow-hidden">
            <div 
              className="bg-success flex items-center justify-center text-xs font-semibold text-success-content"
              style={{ width: `${(stats.positive / stats.total) * 100}%` }}
            >
              {stats.positive > 0 && `${stats.positive} Positive`}
            </div>
            <div 
              className="bg-base-300 flex items-center justify-center text-xs font-semibold text-base-content"
              style={{ width: `${(stats.neutral / stats.total) * 100}%` }}
            >
              {stats.neutral > 0 && `${stats.neutral} Neutral`}
            </div>
            <div 
              className="bg-error flex items-center justify-center text-xs font-semibold text-error-content"
              style={{ width: `${(stats.negative / stats.total) * 100}%` }}
            >
              {stats.negative > 0 && `${stats.negative} Negative`}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {feedbackList.map((feedback) => {
          const status = feedback.processed ? 'applied' : 'pending';
          const statusBadge = getStatusBadge(status);
          const impactBadge = getImpactBadge(feedback.reward?.value);
          
          return (
            <div key={feedback._id || feedback.id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
              <div className="card-body p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getFeedbackIcon(feedback.feedback?.type)}</span>
                    <div>
                      <div className="text-lg">{getRatingStars(feedback.feedback?.rating || 0)}</div>
                      <div className="text-xs opacity-60">{formatDate(feedback.feedback?.timestamp || feedback.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`badge ${statusBadge.class} gap-1`}>
                      {statusBadge.icon} {statusBadge.text}
                    </span>
                    <span className={`badge ${impactBadge.class}`}>
                      {impactBadge.text}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="bg-base-100 p-3 rounded-lg mb-3">
                  <p className="text-sm italic">"{feedback.feedback?.comment || 'No comment provided'}"</p>
                  <p className="text-xs opacity-50 mt-2">Parameter: {feedback.optimization?.parameter}</p>
                </div>

                {/* Optimization Details */}
                {feedback.optimization && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
                      <span><FiZap /></span> Optimization Applied
                    </h4>
                    <div className="bg-base-100 p-2 rounded">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="badge badge-sm badge-ghost">
                          {feedback.optimization.parameter?.replace(/_/g, ' ')}
                        </span>
                        <span className="text-error line-through opacity-60">
                          {String(feedback.optimization.oldValue || 'N/A')}
                        </span>
                        <span className="opacity-50"><FiArrowRight /></span>
                        <span className="text-success font-medium">
                          {String(feedback.optimization.newValue)}
                        </span>
                        <span className="badge badge-sm badge-primary ml-auto">
                          {feedback.optimization.suggestedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!feedback.processed && (
                  <div className="alert bg-base-200 py-2">
                    <span className="text-xs">Feedback received - processing pending</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedbackHistory;

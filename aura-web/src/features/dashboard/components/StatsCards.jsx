import React from 'react';
import { FiBarChart2, FiCpu, FiEdit3, FiClock } from 'react-icons/fi';

function StatsCards({ stats }) {
  return (
    <div className="stats stats-horizontal shadow-xl bg-base-100 w-full">
      <div className="stat">
        <div className="stat-figure text-base-content text-4xl"><FiBarChart2 /></div>
        <div className="stat-title">Total Changes</div>
        <div className="stat-value text-base-content">{stats.totalChanges}</div>
        <div className="stat-desc">All modifications tracked</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content text-4xl"><FiCpu /></div>
        <div className="stat-title">ML Optimizations</div>
        <div className="stat-value text-base-content">{stats.mlChanges}</div>
        <div className="stat-desc">AI-driven improvements</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content text-4xl"><FiEdit3 /></div>
        <div className="stat-title">Manual Changes</div>
        <div className="stat-value text-base-content">{stats.manualChanges}</div>
        <div className="stat-desc">User adjustments</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content text-4xl"><FiClock /></div>
        <div className="stat-title">Current Version</div>
        <div className="stat-value text-base-content">v{stats.currentVersion}</div>
        <div className="stat-desc">Latest state</div>
      </div>
    </div>
  );
}

export default StatsCards;

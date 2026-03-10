import React from 'react';
import { FiSliders, FiRotateCcw, FiRotateCw, FiDownload, FiTrash2, FiFilter, FiCpu, FiEdit3, FiSettings } from 'react-icons/fi';

function ControlPanel({ 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo, 
  onExport, 
  onClear,
  filterType,
  onFilterChange 
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
          <div className="flex flex-row gap-6 items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiSliders /> Controls
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo last change (Ctrl+Z)"
              >
                <FiRotateCcw /> Undo
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo change (Ctrl+Y)"
              >
                <FiRotateCw /> Redo
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={onExport}
                title="Export history as JSON"
              >
                <FiDownload /> Export
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={onClear}
                title="Clear all history"
              >
                <FiTrash2 /> Clear History
              </button>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiFilter /> Filter
            </h3>
            <div className="join">
              <button
                className={`btn btn-sm join-item ${filterType === 'all' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => onFilterChange('all')}
              >
                All
              </button>
              <button
                className={`btn btn-sm join-item ${filterType === 'ml' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => onFilterChange('ml')}
              >
                <FiCpu /> ML
              </button>
              <button
                className={`btn btn-sm join-item ${filterType === 'manual' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => onFilterChange('manual')}
              >
                <FiEdit3 /> Manual
              </button>
              <button
                className={`btn btn-sm join-item ${filterType === 'system' ? 'btn-active' : 'btn-ghost'}`}
                onClick={() => onFilterChange('system')}
              >
                <FiSettings /> System
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;

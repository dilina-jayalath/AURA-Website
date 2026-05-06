import React, { useEffect, useState } from 'react';

function UserInfo({ userId, userData, onUserChange }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(userId || '');

  useEffect(() => {
    setEditId(userId || '');
  }, [userId]);

  const handleConfirm = () => {
    const trimmed = editId.trim();
    if (!trimmed) return;
    onUserChange(trimmed);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditId(userId || '');
    setIsEditMode(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
          <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-2xl font-bold">
                  {userId?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <div>
              {!isEditMode ? (
                <h3 
                  className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors" 
                  onClick={() => setIsEditMode(true)}
                >
                  User ID: {userId}
                </h3>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    value={editId}
                    onChange={(e) => setEditId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirm();
                      if (e.key === 'Escape') handleCancel();
                    }}
                    autoFocus
                  />
                  <button className="btn btn-xs btn-primary" onClick={handleConfirm}>
                    Update
                  </button>
                  <button className="btn btn-xs btn-ghost" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
              <p className="flex items-center gap-2 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </span>
                Active Session
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="badge badge-outline badge-lg">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

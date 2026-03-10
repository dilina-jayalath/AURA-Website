import React from 'react';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';

function Toast({ show, message, type = 'success' }) {
  if (!show) return null;

  const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-info';
  const icon = type === 'success' ? <FiCheck /> : type === 'error' ? <FiX /> : <FiInfo />;

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${alertClass} shadow-lg`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default Toast;

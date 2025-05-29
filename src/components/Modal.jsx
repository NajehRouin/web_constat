import React from 'react';

function Modal({ open, handleClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-semibold"
          aria-label="Fermer la modale"
        >
          ×
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
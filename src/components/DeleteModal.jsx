import React from 'react';
import { X } from 'lucide-react';

export default function DeleteModal({ open, selectedCount, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[70] p-4" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Delete Items"
      >
        <div className="px-7 py-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Delete Items</h3>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-7 pb-6">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-bold text-gray-900">{selectedCount}</span> selected item{selectedCount === 1 ? '' : 's'}?
          </p>
        </div>

        <div className="px-7 py-5 flex items-center justify-end gap-3 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-bold text-red-500 hover:text-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-sm font-bold bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


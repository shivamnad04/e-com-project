import React from "react";

export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
        <h3 className="text-xl font-bold mb-2">Order Confirmed!</h3>
        <p>Total: ₹{receipt.total}</p>
        <p className="text-gray-600 text-sm">
          {new Date(receipt.timestamp).toLocaleString()}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

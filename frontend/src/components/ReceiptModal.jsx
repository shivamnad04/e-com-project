import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import for modern React

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  const { total, timestamp, cart = [], user = {}, items = [] } = receipt;

  // --- PDF Download Handler ---
  const handleDownload = () => {
    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("E-COM CART", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Official Purchase Receipt", 14, 28);

    // Customer Details
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.text(`Date: ${new Date(timestamp).toLocaleString()}`, 14, 38);
    doc.text(`Customer: ${user.name || "N/A"}`, 14, 45);
    doc.text(`Email: ${user.email || "N/A"}`, 14, 52);
    doc.text(`Phone: ${user.phone || "N/A"}`, 14, 59);
    doc.text(`Address: ${user.address || "N/A"}`, 14, 66);
    doc.text(`Payment Method: ${(user.payment || "").toUpperCase()}`, 14, 73);

    // Product Table
    const tableData = (cart.length ? cart : items).map((it, i) => [
      i + 1,
      it.name,
      `₹${it.price}`,
      it.qty,
      `₹${(it.price * it.qty).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["#", "Product", "Price", "Qty", "Subtotal"]],
      body: tableData,
      startY: 85,
      styles: { halign: "center" },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Total
    const y = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${total?.toLocaleString()}`, 150, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with E-COM CART!", 14, y + 15);

    doc.save("receipt.pdf");
  };

  // --- UI ---
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center border-b pb-3 mb-4">
          <h2 className="text-3xl font-bold text-blue-700">🧾 Order Receipt</h2>
          <p className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </p>
        </div>

        {/* Customer Info */}
        <section className="mb-5 space-y-1">
          <h3 className="font-semibold text-lg text-gray-700 border-b pb-1">
            Customer Information
          </h3>
          <p className="text-gray-600 text-sm">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Address:</strong> {user.address}
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Payment:</strong>{" "}
            {user.payment?.toUpperCase() || "Not specified"}
          </p>
        </section>

        {/* Product Table */}
        <section className="mb-5">
          <h3 className="font-semibold text-lg text-gray-700 border-b pb-1 mb-2">
            Order Summary
          </h3>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Price</th>
                  <th className="p-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(cart.length ? cart : items).map((it, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-2">{it.name}</td>
                    <td className="p-2 text-center">{it.qty}</td>
                    <td className="p-2 text-right">₹{it.price}</td>
                    <td className="p-2 text-right">
                      ₹{(it.price * it.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t">
                <tr>
                  <td colSpan={3} className="p-2 font-semibold text-right">
                    Total
                  </td>
                  <td className="p-2 text-right text-blue-700 font-bold">
                    ₹{total?.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t pt-4 text-center text-gray-600 text-sm">
          <p>
            Thank you for shopping with{" "}
            <span className="font-semibold text-blue-700">E-Com Cart</span>!
          </p>
          <p className="text-xs mt-1">
            This is a computer-generated receipt. No signature required.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            ⬇️ Download PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

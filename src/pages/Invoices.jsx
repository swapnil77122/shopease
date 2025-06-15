import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('invoices');
    if (stored) setInvoices(JSON.parse(stored));
  }, []);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🧾 TechNova Pvt. Ltd.", 20, 20);
    doc.setFontSize(10);
    doc.text("GSTIN: 29ABCDE1234F2Z5", 20, 26);
    doc.text("123, Innovation Park, Bengaluru, India", 20, 32);
    doc.text("Email: support@technova.in | Phone: +91-9876543210", 20, 38);

    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42); // Separator

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 50);
    doc.text(`Date: ${order.date}`, 20, 58);
    doc.text(`Customer Name: ${order.address.name}`, 20, 66);
    doc.text(`Phone: ${order.address.phone}`, 20, 74);
    doc.text(`Email: ${order.address.email}`, 20, 82);
    doc.text(`Shipping Address: ${order.address.address}`, 20, 90);

    doc.setFontSize(13);
    doc.text("Items Purchased:", 20, 105);
    let y = 115;

    order.items.forEach((item, index) => {
      doc.setFontSize(11);
      doc.text(`${index + 1}. ${item.name} — ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`, 25, y);
      y += 8;
    });

    y += 5;
    doc.setLineWidth(0.1);
    doc.line(20, y, 190, y);
    y += 8;

    doc.setFontSize(13);
    doc.text(`Total Amount: ₹${order.total}`, 20, y);
    y += 15;

    doc.setFontSize(11);
    doc.text("Thank you for shopping with TechNova! 😊", 20, y);

    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Your Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-gray-600">No invoices found.</p>
      ) : (
        <div className="space-y-6">
          {invoices.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Name:</strong> {order.address.name}</p>
              <p><strong>Address:</strong> {order.address.address}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>

              <ul className="mt-2 list-disc pl-6">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))}
              </ul>

              <button
                onClick={() => downloadInvoice(order)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoices;

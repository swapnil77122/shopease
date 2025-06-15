import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });

  // Company Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(33, 37, 41);
  doc.text('TechNova Pvt Ltd', 14, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text('123 Innovation Street, Bengaluru, India', 14, 28);
  doc.text('Email: support@technova.in | Phone: +91-9876543210', 14, 34);

  // Invoice Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text('INVOICE', 200 - 14, 20, { align: 'right' });

  // Order Info
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${invoice.id}`, 14, 48);
  doc.text(`Date: ${invoice.date}`, 14, 55);

  // Customer Info
  doc.setFontSize(12);
  doc.text(`Customer: ${invoice.address.name}`, 14, 68);
  doc.text(`Email: ${invoice.address.email}`, 14, 74);
  doc.text(`Phone: ${invoice.address.phone}`, 14, 80);
  doc.text(`Address: ${invoice.address.address}`, 14, 86);

  // Table: Items
  const tableData = invoice.items.map((item, index) => [
    index + 1,
    item.name,
    item.quantity,
    `₹${item.price}`,
    `₹${item.price * item.quantity}`
  ]);

  autoTable(doc, {
    startY: 100,
    head: [['#', 'Item Name', 'Qty', 'Price', 'Subtotal']],
    body: tableData,
    theme: 'grid',
    styles: {
      halign: 'center',
      fontSize: 11,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [0, 102, 204],
      textColor: 255,
      fontSize: 12,
    },
    columnStyles: {
      1: { halign: 'left' }, // Item name left aligned
    },
  });

  // Final Y after table
  const finalY = doc.lastAutoTable.finalY + 10;

  // Total amount
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total: ₹${invoice.total}`, 200 - 14, finalY, { align: 'right' });

  // Footer - Thank you
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text('Thank you for shopping with us!', 14, finalY + 10);

  // Save PDF
  doc.save(`Invoice_${invoice.id}.pdf`);
};

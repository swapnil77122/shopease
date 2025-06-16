import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = (invoice) => {
  try {
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });

    // Metadata (Optional but clean)
    doc.setProperties({
      title: `Invoice_${invoice.id}`,
      subject: 'Invoice',
      author: 'TechNova Pvt Ltd',
    });

    // Set clean font
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('TechNova Pvt Ltd', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('GSTIN: 29ABCDE1234F2Z5', 14, 26);
    doc.text('123, Innovation Park, Bengaluru, India', 14, 32);
    doc.text('Email: support@technova.in | Phone: +91-9876543210', 14, 38);

    // Invoice Label
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('INVOICE', 196, 20, { align: 'right' });

    // Order Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);
    doc.text(`Order ID: ${invoice.id}`, 14, 50);
    doc.text(`Date: ${invoice.date}`, 14, 58);

    // Customer Info
    doc.text(`Customer Name: ${invoice.address.name}`, 14, 70);
    doc.text(`Phone: ${invoice.address.phone}`, 14, 76);
    doc.text(`Email: ${invoice.address.email}`, 14, 82);
    doc.text(`Shipping Address: ${invoice.address.address}`, 14, 88);

    // Items Table
    const tableData = invoice.items.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `₹ ${item.price}`,
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
        1: { halign: 'left' },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total: ₹${invoice.total}`, 196, finalY, { align: 'right' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Thank you for shopping with us!', 14, finalY + 10);

    // Save
    doc.save(`Invoice_${invoice.id}.pdf`);
  } catch (err) {
    console.error('PDF Generation Error:', err);
  }
};

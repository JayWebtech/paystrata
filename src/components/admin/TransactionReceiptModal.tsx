import { X, Download, Copy } from 'lucide-react';
import { Transaction } from '@/services/admin';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionReceiptModal({ 
  transaction, 
  isOpen, 
  onClose 
}: TransactionReceiptModalProps) {
  if (!isOpen || !transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Add custom fonts and colors
    doc.setFontSize(24);
    doc.setTextColor(168, 105, 244); // Primary color #a869f4
    doc.text('Paystrata', 105, 20, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(107, 114, 128); // Gray
    doc.text('Transaction Receipt', 105, 30, { align: 'center' });
    
    // Divider line
    doc.setDrawColor(168, 105, 244);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Transaction details section
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55); // Dark gray
    
    // Left column
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text('Reference Code:', 20, 50);
    doc.setTextColor(31, 41, 55);
    doc.text(transaction.refcode || 'N/A', 20, 55);
    
    doc.setTextColor(107, 114, 128);
    doc.text('Transaction Type:', 20, 65);
    doc.setTextColor(31, 41, 55);
    doc.text(transaction.txn_type.replace('_', ' ').toUpperCase(), 20, 70);
    
    doc.setTextColor(107, 114, 128);
    doc.text('Date & Time:', 20, 80);
    doc.setTextColor(31, 41, 55);
    doc.text(formatDate(transaction.created_at), 20, 85);
    
    // Right column
    doc.setTextColor(107, 114, 128);
    doc.text('Status:', 110, 50);
    doc.setTextColor(31, 41, 55);
    doc.text(transaction.status.toUpperCase(), 110, 55);
    
    doc.setTextColor(107, 114, 128);
    doc.text('Refund Status:', 110, 65);
    doc.setTextColor(31, 41, 55);
    doc.text(transaction.refunded ? 'REFUNDED' : 'NOT REFUNDED', 110, 70);
    
    // Amount section - clean design without background
    doc.setFontSize(16);
    doc.setTextColor(168, 105, 244);
    doc.text('Amount in NGN', 20, 105);
    
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 55);
    doc.text(formatCurrency(transaction.amount), 20, 115);
    
    if (transaction.stark_amount) {
      doc.setFontSize(16);
      doc.setTextColor(168, 105, 244);
      doc.text('Amount in STRK', 20, 130);
      
      doc.setFontSize(18);
      doc.setTextColor(31, 41, 55);
      doc.text(`${Number(transaction.stark_amount).toFixed(4)} STRK`, 20, 140);
    }
    
    // Payment details section title
    doc.setFontSize(14);
    doc.setTextColor(168, 105, 244);
    doc.text('Payment Details', 20, 155);
    
    // Payment details table
    const paymentDetails = [
      ['Wallet Address', transaction.wallet_address],
    ];
    
    if (transaction.hash) {
      paymentDetails.push(['Transaction Hash', transaction.hash]);
    }
    if (transaction.phone_number) {
      paymentDetails.push(['Phone Number', transaction.phone_number]);
    }
    if (transaction.network) {
      paymentDetails.push(['Network', transaction.network]);
    }
    if (transaction.iuc_number) {
      paymentDetails.push(['IUC Number', transaction.iuc_number]);
    }
    if (transaction.meter_number) {
      paymentDetails.push(['Meter Number', transaction.meter_number]);
    }
    
    autoTable(doc, {
      head: [['Field', 'Value']],
      body: paymentDetails,
      startY: 160,
      margin: { left: 20, right: 20 },
      tableWidth: 170,
      theme: 'grid',
      headStyles: {
        fillColor: [168, 105, 244],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10,
        textColor: [31, 41, 55]
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      },
      styles: {
        cellPadding: 5,
        lineWidth: 0.1
      }
    });
    
    // Footer
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text('Thank you for using Paystrata!', 105, finalY, { align: 'center' });
    
    doc.setFontSize(8);
    doc.text('This is an official transaction receipt from Paystrata', 105, finalY + 5, { align: 'center' });
    doc.text('For support, contact: support@paystrata.com', 105, finalY + 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`receipt-${transaction.refcode || transaction.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Transaction Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
              {transaction.status.toUpperCase()}
            </span>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Reference Code</label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-900 font-mono">{transaction.refcode || 'N/A'}</span>
                    {transaction.refcode && (
                      <button
                        onClick={() => copyToClipboard(transaction.refcode!)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <Copy size={16} />
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction Type</label>
                  <p className="text-sm text-gray-900 capitalize">{transaction.txn_type.replace('_', ' ')}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Amount</label>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(transaction.amount)}</p>
                  {transaction.stark_amount && (
                    <p className="text-sm text-gray-500">{Number(transaction.stark_amount).toFixed(4)} STRK</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-sm text-gray-900">{formatDate(transaction.created_at)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Wallet Address</label>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-900 font-mono truncate">{transaction.wallet_address}</span>
                    <button
                      onClick={() => copyToClipboard(transaction.wallet_address)}
                      className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                {transaction.hash && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Transaction Hash</label>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-900 font-mono truncate">{transaction.hash}</span>
                      <button
                        onClick={() => copyToClipboard(transaction.hash!)}
                        className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {transaction.phone_number && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-sm text-gray-900">{transaction.phone_number}</p>
                  </div>
                )}

                {transaction.network && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Network</label>
                    <p className="text-sm text-gray-900">{transaction.network}</p>
                  </div>
                )}

                {transaction.iuc_number && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">IUC Number</label>
                    <p className="text-sm text-gray-900">{transaction.iuc_number}</p>
                  </div>
                )}

                {transaction.meter_number && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meter Number</label>
                    <p className="text-sm text-gray-900">{transaction.meter_number}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">Refund Status</label>
                  <p className="text-sm text-gray-900">{transaction.refunded ? 'Refunded' : 'Not Refunded'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={downloadReceipt}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Download size={16} className="mr-2" />
              Download PDF Receipt
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

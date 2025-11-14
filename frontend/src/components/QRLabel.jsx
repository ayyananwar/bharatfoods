import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Printer, Download } from 'lucide-react';
import { toast } from '../hooks/use-toast';

// IMPORTANT: This component creates a fixed 50mm x 25mm label for TVS LP-64 Lite printer
// QR size is FIXED and will NOT change based on product name length
// Product name truncates to 2 lines max to prevent layout issues

const QRLabel = ({ product }) => {
  const labelRef = useRef(null);
  const qrUrl = `${window.location.origin}/product/${product.slug}`;
  
  // Fixed QR pixel size for 20mm at 203 DPI (approx 160px)
  const QR_SIZE = 160;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgElement = labelRef.current.querySelector('svg');
    
    if (!svgElement) return;

    // High resolution for printing (300 DPI equivalent)
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    
    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.download = `${product.slug}-qr.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(url);
        toast({
          title: "QR Downloaded",
          description: "High-resolution QR code saved successfully.",
        });
      });
    };
    
    img.src = url;
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons - Hidden during print */}
      <div className="print:hidden flex gap-3 justify-center">
        <Button
          onClick={handlePrint}
          className="bg-[#a56c43] hover:bg-[#8d5a38] text-white"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Label
        </Button>
        <Button
          onClick={handleDownloadQR}
          variant="outline"
          className="border-[#a56c43] text-[#a56c43] hover:bg-[#a56c43] hover:text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR
        </Button>
      </div>

      {/* Label Notice */}
      <div className="print:hidden bg-[#fdf6e3] border border-[#a56c43]/30 rounded-lg p-4 text-sm text-[#3d2817]">
        <p className="font-medium mb-1">Label Preview (50mm × 25mm)</p>
        <p className="text-gray-700">Product name wraps to 2 lines max. QR size is fixed and won't change.</p>
      </div>

      {/* Actual Label - Fixed dimensions */}
      <div className="flex justify-center">
        <div
          ref={labelRef}
          className="label-container"
          style={{
            width: '50mm',
            height: '25mm',
            border: '2px solid #333',
            background: 'white',
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif',
            padding: '1.5mm'
          }}
        >
          {/* Left Column: Text Information */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: '2mm',
            minWidth: 0
          }}>
            {/* Product Name - Bold and prominent */}
            <div style={{
              fontSize: '9pt',
              fontWeight: '800',
              lineHeight: '1.15',
              marginBottom: '1mm',
              color: '#000',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word'
            }}>
              {product.name}
            </div>
            
            {/* Product Details - Compact */}
            <div style={{ 
              fontSize: '6.5pt', 
              lineHeight: '1.3', 
              color: '#000',
              fontWeight: '500'
            }}>
              <div style={{ marginBottom: '0.3mm' }}>
                <span style={{ fontWeight: '700' }}>FSSAI: </span>{product.fssai}
              </div>
              <div style={{ marginBottom: '0.3mm' }}>
                <span style={{ fontWeight: '700' }}>MRP: </span>₹{product.mrp}
              </div>
              <div style={{ marginBottom: '0.3mm' }}>
                <span style={{ fontWeight: '700' }}>MFG: </span>{product.mfg}
              </div>
              <div>
                <span style={{ fontWeight: '700' }}>EXP: </span>{product.exp}
              </div>
            </div>
          </div>

          {/* Right Column: QR Code - FIXED SIZE */}
          <div style={{
            width: '21mm',
            height: '21mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid #ddd',
            borderRadius: '1mm',
            padding: '0.5mm',
            backgroundColor: '#fff'
          }}>
            <QRCodeSVG
              value={qrUrl}
              size={QR_SIZE}
              level="H"
              includeMargin={false}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>

      {/* Print Instructions */}
      <div className="print:hidden bg-white border rounded-lg p-4 text-sm text-gray-700 max-w-2xl mx-auto">
        <h3 className="font-semibold text-[#a56c43] mb-2">Print Settings for TVS LP-64 Lite:</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Printer: Select <strong>TVS LP-64 Lite</strong></li>
          <li>Paper Size: <strong>Custom - 50mm × 25mm</strong></li>
          <li>Margins: <strong>None</strong></li>
          <li>Scale: <strong>100%</strong></li>
          <li>Headers/Footers: <strong>Disable</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default QRLabel;
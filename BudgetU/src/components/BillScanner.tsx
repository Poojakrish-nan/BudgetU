import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { ScanLine } from 'lucide-react';

interface BillScannerProps {
  onAmountDetected: (amount: number) => void;
}

export function BillScanner({ onAmountDetected }: BillScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setPreview(URL.createObjectURL(file));

    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    // Extract amount using regex
    const amountMatch = text.match(/\$?\d+\.\d{2}/);
    if (amountMatch) {
      const amount = parseFloat(amountMatch[0].replace('$', ''));
      onAmountDetected(amount);
    }

    setScanning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-4">
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <ScanLine className="w-8 h-8 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Scan Bill</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            capture="environment"
          />
        </label>
        
        {preview && (
          <div className="relative w-full aspect-video">
            <img
              src={preview}
              alt="Bill preview"
              className="w-full h-full object-cover rounded-lg"
            />
            {scanning && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-white">Scanning...</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
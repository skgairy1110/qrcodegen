import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

const QRCodeGenerator = () => {
  const [qrValue, setQRValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const qrCodeRef = useRef(null);

  const generateQRCode = () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setQRValue(inputValue);
      setIsGenerating(false);
    }, 500); // Simulate a short delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const copyToClipboard = async () => {
    if (qrCodeRef.current) {
      try {
        const dataUrl = await toPng(qrCodeRef.current);
        const blob = await fetch(dataUrl).then(res => res.blob());
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success("QR Code copied to clipboard!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to copy QR Code");
      }
    }
  };

  const saveAsPNG = async () => {
    if (qrCodeRef.current) {
      try {
        const dataUrl = await toPng(qrCodeRef.current);
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = dataUrl;
        link.click();
        toast.success("QR Code saved as PNG!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to save QR Code");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
        <CardTitle className="text-2xl font-bold text-white">QR Code Alchemist</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter text or URL and press Enter"
            className="w-full text-lg"
          />
          <Button 
            onClick={generateQRCode} 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isGenerating || !inputValue.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate QR Code'
            )}
          </Button>
          {qrValue && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-center">
                <div ref={qrCodeRef} className="p-4 bg-white rounded-lg shadow-md">
                  <QRCodeSVG value={qrValue} size={200} />
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={copyToClipboard} className="flex items-center">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={saveAsPNG} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
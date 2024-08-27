import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const QRCodeGenerator = () => {
  const [qrValue, setQRValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setQRValue(inputValue);
      setIsGenerating(false);
    }, 500); // Simulate a short delay
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
            placeholder="Enter text or URL"
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
            <div className="mt-6 flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <QRCodeSVG value={qrValue} size={200} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
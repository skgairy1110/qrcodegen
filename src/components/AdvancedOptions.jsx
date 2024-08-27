import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdvancedOptions = ({ text, setText, logo, setLogo, showLogo, setShowLogo }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-below">Text Below QR Code</Label>
        <Input
          id="text-below"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to display below QR code"
        />
      </div>
      <div>
        <Label htmlFor="logo-url">Logo URL</Label>
        <Input
          id="logo-url"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="Enter URL of logo image"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="show-logo"
          checked={showLogo}
          onCheckedChange={setShowLogo}
        />
        <Label htmlFor="show-logo">Show Logo in QR Code</Label>
      </div>
    </div>
  );
};

export default AdvancedOptions;
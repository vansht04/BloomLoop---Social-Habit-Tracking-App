import { useState } from 'react';
import { Palette, Type, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/lib/AppContext';
import { toast } from 'sonner';

export default function UICustomization() {
  const { uiCustomization, updateUICustomization } = useApp();
  const [localSettings, setLocalSettings] = useState(uiCustomization);

  const handleSave = () => {
    updateUICustomization(localSettings);
    toast.success('UI customization saved!');
  };

  const handleReset = () => {
    const defaultSettings = {
      fontSize: 'medium' as const,
      textColor: '#000000',
      backgroundColor: '#ffffff',
    };
    setLocalSettings(defaultSettings);
    updateUICustomization(defaultSettings);
    toast.success('UI customization reset to defaults!');
  };

  const getFontSizeClass = () => {
    switch (localSettings.fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">UI Customization</h1>
          <p className="text-muted-foreground">Personalize your BloomLoop experience</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Customization Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </Label>
                <Select
                  value={localSettings.fontSize}
                  onValueChange={(value: 'small' | 'medium' | 'large') =>
                    setLocalSettings(prev => ({ ...prev, fontSize: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={localSettings.textColor}
                    onChange={e => setLocalSettings(prev => ({ ...prev, textColor: e.target.value }))}
                    className="h-10 w-20"
                  />
                  <Input
                    value={localSettings.textColor}
                    onChange={e => setLocalSettings(prev => ({ ...prev, textColor: e.target.value }))}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={localSettings.backgroundColor}
                    onChange={e => setLocalSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="h-10 w-20"
                  />
                  <Input
                    value={localSettings.backgroundColor}
                    onChange={e => setLocalSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-lg border p-6 transition-all"
                style={{
                  backgroundColor: localSettings.backgroundColor,
                  color: localSettings.textColor,
                }}
              >
                <div className={`space-y-4 ${getFontSizeClass()}`}>
                  <h3 className="font-bold">Preview Heading</h3>
                  <p>
                    This is a preview of how your text will look with the selected customization settings. The font size,
                    text color, and background color will be applied to this preview area.
                  </p>
                  <div className="flex gap-2">
                    <div className="rounded-md border border-current px-3 py-2">Button Preview</div>
                    <div className="rounded-md border border-current px-3 py-2">Another Button</div>
                  </div>
                  <div className="rounded-md border border-current p-4">
                    <p className="font-semibold">Card Preview</p>
                    <p className="opacity-80">This is how cards will appear with your settings.</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: These settings are stored locally and will reset when you refresh the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

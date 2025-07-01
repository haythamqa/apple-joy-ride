
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface SettingsPanelProps {
  prayerSettings: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  onPrayerSettingsChange: (settings: any) => void;
  appSettings: {
    timeFormat: '12h' | '24h';
    reminderInterval: number;
    alertSound: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  onAppSettingsChange: (settings: any) => void;
}

export const SettingsPanel = ({ 
  prayerSettings, 
  onPrayerSettingsChange, 
  appSettings, 
  onAppSettingsChange 
}: SettingsPanelProps) => {
  const [language, setLanguage] = useState('العربية');
  const [country, setCountry] = useState('المملكة العربية السعودية');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handlePrayerToggle = (prayer: string) => {
    onPrayerSettingsChange({
      ...prayerSettings,
      [prayer]: !prayerSettings[prayer as keyof typeof prayerSettings]
    });
  };

  const handleAppSettingChange = (key: string, value: any) => {
    onAppSettingsChange({
      ...appSettings,
      [key]: value
    });
  };

  const reminderIntervals = [15, 30, 40];
  const alertSounds = ['default', 'adhan', 'bell', 'chime'];
  const fontSizes = ['small', 'medium', 'large'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-islamic-green mb-2">الإعدادات</h1>
        <p className="text-islamic-brown">تخصيص تجربتك الإسلامية</p>
      </div>

      {/* Prayer Reminders */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          تذكير الصلاة
        </h2>
        
        {[
          { key: 'fajr', name: 'الفجر' },
          { key: 'dhuhr', name: 'الظهر' },
          { key: 'asr', name: 'العصر' },
          { key: 'maghrib', name: 'المغرب' },
          { key: 'isha', name: 'العشاء' }
        ].map((prayer) => (
          <div key={prayer.key} className="flex items-center justify-between py-2">
            <span className="text-lg font-medium text-islamic-brown">
              {prayer.name}
            </span>
            <Switch
              checked={prayerSettings[prayer.key as keyof typeof prayerSettings]}
              onCheckedChange={() => handlePrayerToggle(prayer.key)}
              className="data-[state=checked]:bg-islamic-green"
            />
          </div>
        ))}
      </div>

      {/* App Settings */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          إعدادات التطبيق
        </h2>
        
        {/* Time Format */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">تنسيق الوقت</label>
          <div className="flex space-x-2 space-x-reverse">
            {['12h', '24h'].map((format) => (
              <Button
                key={format}
                onClick={() => handleAppSettingChange('timeFormat', format)}
                variant={appSettings.timeFormat === format ? 'default' : 'outline'}
                className={`flex-1 ${
                  appSettings.timeFormat === format 
                    ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                    : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                }`}
              >
                {format === '12h' ? '12 ساعة' : '24 ساعة'}
              </Button>
            ))}
          </div>
        </div>

        {/* Reminder Interval */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">وقت التذكير بعد الصلاة</label>
          <div className="grid grid-cols-3 gap-2">
            {reminderIntervals.map((interval) => (
              <Button
                key={interval}
                onClick={() => handleAppSettingChange('reminderInterval', interval)}
                variant={appSettings.reminderInterval === interval ? 'default' : 'outline'}
                className={`${
                  appSettings.reminderInterval === interval 
                    ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                    : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                }`}
              >
                {interval} د
              </Button>
            ))}
          </div>
        </div>

        {/* Alert Sound */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">صوت التنبيه</label>
          <div className="grid grid-cols-2 gap-2">
            {alertSounds.map((sound) => (
              <Button
                key={sound}
                onClick={() => handleAppSettingChange('alertSound', sound)}
                variant={appSettings.alertSound === sound ? 'default' : 'outline'}
                className={`${
                  appSettings.alertSound === sound 
                    ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                    : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                }`}
              >
                {sound === 'default' ? 'افتراضي' : 
                 sound === 'adhan' ? 'أذان' : 
                 sound === 'bell' ? 'جرس' : 'نغمة'}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">حجم الخط</label>
          <div className="flex space-x-2 space-x-reverse">
            {fontSizes.map((size) => (
              <Button
                key={size}
                onClick={() => handleAppSettingChange('fontSize', size)}
                variant={appSettings.fontSize === size ? 'default' : 'outline'}
                className={`flex-1 ${
                  appSettings.fontSize === size 
                    ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                    : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                }`}
              >
                {size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          الإعدادات العامة
        </h2>
        
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">اللغة</label>
          <div className="p-3 bg-white/50 rounded-lg border border-islamic-green/20">
            <span className="text-islamic-green">{language}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">الدولة المحددة</label>
          <div className="p-3 bg-white/50 rounded-lg border border-islamic-green/20">
            <span className="text-islamic-green">{country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-lg font-medium text-islamic-brown">
            الإشعارات
          </span>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            className="data-[state=checked]:bg-islamic-green"
          />
        </div>
      </div>

      {/* App Info */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🌙</span>
          </div>
          <h3 className="text-lg font-bold text-islamic-green font-amiri">
            صديقي
          </h3>
          <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
            <span className="text-white text-sm">💚</span>
          </div>
        </div>
        <p className="text-sm text-islamic-brown">
          جرب التطبيق لأول شهر مجاناً
        </p>
      </div>
    </div>
  );
};

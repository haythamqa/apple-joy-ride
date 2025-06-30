
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface SettingsPanelProps {
  prayerSettings: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  onPrayerSettingsChange: (settings: any) => void;
}

export const SettingsPanel = ({ prayerSettings, onPrayerSettingsChange }: SettingsPanelProps) => {
  const [language, setLanguage] = useState('العربية');
  const [country, setCountry] = useState('المملكة العربية السعودية');
  const [reminderTime, setReminderTime] = useState('15 دقيقة بعد الصلاة');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handlePrayerToggle = (prayer: string) => {
    onPrayerSettingsChange({
      ...prayerSettings,
      [prayer]: !prayerSettings[prayer as keyof typeof prayerSettings]
    });
  };

  const settings = [
    {
      title: 'اللغة',
      value: language,
      options: ['العربية', 'English']
    },
    {
      title: 'الدولة المحددة',
      value: country,
      options: ['المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'مصر']
    },
    {
      title: 'وقت التذكير بعد الصلاة',
      value: reminderTime,
      options: ['15 دقيقة بعد الصلاة', '30 دقيقة بعد الصلاة', '45 دقيقة بعد الصلاة']
    }
  ];

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

      {/* General Settings */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          الإعدادات العامة
        </h2>
        
        {settings.map((setting, index) => (
          <div key={index} className="space-y-2">
            <label className="text-islamic-brown font-medium">{setting.title}</label>
            <div className="p-3 bg-white/50 rounded-lg border border-islamic-green/20">
              <span className="text-islamic-green">{setting.value}</span>
            </div>
          </div>
        ))}

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

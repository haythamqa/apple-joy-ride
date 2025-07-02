
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
    language: 'ar' | 'en';
  };
  onAppSettingsChange: (settings: any) => void;
}

export const SettingsPanel = ({ 
  prayerSettings, 
  onPrayerSettingsChange, 
  appSettings, 
  onAppSettingsChange 
}: SettingsPanelProps) => {
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

  const isArabic = appSettings.language === 'ar';

  const texts = {
    ar: {
      settings: 'الإعدادات',
      prayerReminder: 'تذكير الصلاة',
      appSettings: 'إعدادات التطبيق',
      timeFormat: 'تنسيق الوقت',
      reminderTime: 'وقت التذكير بعد الصلاة',
      alertSound: 'صوت التنبيه',
      fontSize: 'حجم الخط',
      generalSettings: 'الإعدادات العامة',
      language: 'اللغة',
      country: 'الدولة المحددة',
      notifications: 'الإشعارات',
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
      hour12: '12 ساعة',
      hour24: '24 ساعة',
      default: 'افتراضي',
      adhan: 'أذان',
      bell: 'جرس',
      chime: 'نغمة',
      small: 'صغير',
      medium: 'متوسط',
      large: 'كبير',
      arabic: 'العربية',
      english: 'English',
      minutes: 'د'
    },
    en: {
      settings: 'Settings',
      prayerReminder: 'Prayer Reminder',
      appSettings: 'App Settings',
      timeFormat: 'Time Format',
      reminderTime: 'Reminder Time After Prayer',
      alertSound: 'Alert Sound',
      fontSize: 'Font Size',
      generalSettings: 'General Settings',
      language: 'Language',
      country: 'Selected Country',
      notifications: 'Notifications',
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      hour12: '12 Hour',
      hour24: '24 Hour',
      default: 'Default',
      adhan: 'Adhan',
      bell: 'Bell',
      chime: 'Chime',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      arabic: 'العربية',
      english: 'English',
      minutes: 'min'
    }
  };

  const t = texts[appSettings.language];

  return (
    <div className={`space-y-6 animate-fade-in ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-islamic-green mb-2">{t.settings}</h1>
      </div>

      {/* Prayer Reminders */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          {t.prayerReminder}
        </h2>
        
        {[
          { key: 'fajr', name: t.fajr },
          { key: 'dhuhr', name: t.dhuhr },
          { key: 'asr', name: t.asr },
          { key: 'maghrib', name: t.maghrib },
          { key: 'isha', name: t.isha }
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
          {t.appSettings}
        </h2>
        
        {/* Time Format */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.timeFormat}</label>
          <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
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
                {format === '12h' ? t.hour12 : t.hour24}
              </Button>
            ))}
          </div>
        </div>

        {/* Reminder Interval */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.reminderTime}</label>
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
                {interval} {t.minutes}
              </Button>
            ))}
          </div>
        </div>

        {/* Alert Sound */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.alertSound}</label>
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
                {t[sound as keyof typeof t]}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.fontSize}</label>
          <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
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
                {t[size as keyof typeof t]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          {t.generalSettings}
        </h2>
        
        {/* Language Toggle */}
        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.language}</label>
          <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
            <Button
              onClick={() => handleAppSettingChange('language', 'ar')}
              variant={appSettings.language === 'ar' ? 'default' : 'outline'}
              className={`flex-1 ${
                appSettings.language === 'ar' 
                  ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                  : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
              }`}
            >
              {t.arabic}
            </Button>
            <Button
              onClick={() => handleAppSettingChange('language', 'en')}
              variant={appSettings.language === 'en' ? 'default' : 'outline'}
              className={`flex-1 ${
                appSettings.language === 'en' 
                  ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                  : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
              }`}
            >
              {t.english}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-islamic-brown font-medium">{t.country}</label>
          <div className="p-3 bg-white/50 rounded-lg border border-islamic-green/20">
            <span className="text-islamic-green">{country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-lg font-medium text-islamic-brown">
            {t.notifications}
          </span>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            className="data-[state=checked]:bg-islamic-green"
          />
        </div>
      </div>

      {/* App Info - Removed green heart icons */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🌙</span>
          </div>
          <h3 className="text-lg font-bold text-islamic-green font-amiri">
            صديقي
          </h3>
        </div>
        <p className="text-sm text-islamic-brown">
          جرب التطبيق لأول شهر مجاناً
        </p>
      </div>
    </div>
  );
};

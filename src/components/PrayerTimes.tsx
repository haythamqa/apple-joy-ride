
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface PrayerTimesProps {
  prayerSettings: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  reminderInterval: number;
  appSettings: {
    language: 'ar' | 'en';
  };
}

export const PrayerTimes = ({ prayerSettings, reminderInterval, appSettings }: PrayerTimesProps) => {
  const [showReminders, setShowReminders] = useState(false);

  const isArabic = appSettings.language === 'ar';

  const texts = {
    ar: {
      back: '← العودة',
      afterPrayerTimes: 'بعد أوقات الصلاة',
      reminderAfter: `التذكير بعد ${reminderInterval} دقيقة من الصلاة`,
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء'
    },
    en: {
      back: '← Back',
      afterPrayerTimes: 'After Prayer Times',
      reminderAfter: `Reminder after ${reminderInterval} minutes of prayer`,
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha'
    }
  };

  const t = texts[appSettings.language];

  const prayers = [
    { name: t.fajr, time: '04:45', key: 'fajr', enabled: prayerSettings.fajr },
    { name: t.dhuhr, time: '12:15', key: 'dhuhr', enabled: prayerSettings.dhuhr },
    { name: t.asr, time: '15:30', key: 'asr', enabled: prayerSettings.asr },
    { name: t.maghrib, time: '18:45', key: 'maghrib', enabled: prayerSettings.maghrib },
    { name: t.isha, time: '20:00', key: 'isha', enabled: prayerSettings.isha },
  ];

  if (showReminders) {
    return (
      <div className={`space-y-4 animate-fade-in ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowReminders(false)}
            className="text-islamic-green hover:text-islamic-green-light transition-colors"
          >
            {t.back}
          </button>
          <h2 className="text-xl font-semibold text-islamic-green">{t.afterPrayerTimes}</h2>
        </div>

        <div className="prayer-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
            <div className="w-12 h-12 bg-islamic-green rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌙</span>
            </div>
            <h3 className="text-2xl font-bold text-islamic-green font-amiri">
              صديقي
            </h3>
          </div>

          <div className="mb-4 p-3 bg-islamic-green/10 rounded-lg">
            <p className="text-sm text-islamic-brown text-center">
              {t.reminderAfter}
            </p>
          </div>

          {prayers.map((prayer) => (
            <div key={prayer.key} className="flex items-center justify-between py-3 border-b border-islamic-green/20 last:border-b-0">
              <div className={`flex items-center space-x-3 ${isArabic ? 'space-x-reverse' : ''}`}>
                <Switch
                  checked={prayer.enabled}
                  className="data-[state=checked]:bg-islamic-green"
                />
                <span className="text-lg font-medium text-islamic-brown">
                  {prayer.name}
                </span>
              </div>
              <span className="text-islamic-green font-medium">
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 animate-fade-in ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <button
          onClick={() => setShowReminders(true)}
          className="prayer-card rounded-2xl p-6 w-full hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="w-10 h-10 bg-islamic-green rounded-full flex items-center justify-center">
              <span className="text-white">🌙</span>
            </div>
            <h2 className="text-xl font-bold text-islamic-green font-amiri">
              صديقي
            </h2>
          </div>
          <p className="text-islamic-brown font-medium">
            {t.afterPrayerTimes}
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {prayers.map((prayer, index) => (
          <div
            key={prayer.key}
            className={`prayer-card rounded-xl p-4 transition-all duration-300 ${
              prayer.enabled ? 'border-r-4 border-islamic-green' : 'opacity-60'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-3 ${isArabic ? 'space-x-reverse' : ''}`}>
                <div className={`w-3 h-3 rounded-full ${
                  prayer.enabled ? 'bg-islamic-green' : 'bg-gray-300'
                }`}></div>
                <span className="text-lg font-medium text-islamic-brown">
                  {prayer.name}
                </span>
              </div>
              <span className="text-islamic-green font-bold text-lg">
                {prayer.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


interface PrayerHeaderProps {
  currentTime: Date;
  timeFormat: '12h' | '24h';
  appSettings: {
    language: 'ar' | 'en';
  };
}

export const PrayerHeader = ({ currentTime, timeFormat, appSettings }: PrayerHeaderProps) => {
  const formatTime = (date: Date) => {
    if (timeFormat === '12h') {
      return date.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const isArabic = appSettings.language === 'ar';

  // Prayer times data
  const prayerTimes = [
    { name: isArabic ? 'الفجر' : 'Fajr', time: '04:45' },
    { name: isArabic ? 'الظهر' : 'Dhuhr', time: '12:15' },
    { name: isArabic ? 'العصر' : 'Asr', time: '15:30' },
    { name: isArabic ? 'المغرب' : 'Maghrib', time: '18:45' },
    { name: isArabic ? 'العشاء' : 'Isha', time: '20:00' },
  ];

  return (
    <div className={`text-center space-y-4 animate-fade-in ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🌙</span>
        </div>
        <h1 className="text-3xl font-bold text-islamic-green font-amiri">
          صديقي
        </h1>
      </div>
      
      <div className="space-y-2">
        <div className="text-4xl font-bold text-islamic-brown">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-islamic-green font-medium">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Prayer Times Display */}
      <div className="prayer-card rounded-2xl p-4 mt-6">
        <h2 className="text-lg font-semibold text-islamic-green mb-4 border-b border-islamic-green/20 pb-2">
          {isArabic ? 'أوقات الصلاة' : 'Prayer Times'}
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-islamic-green/10 last:border-b-0"
            >
              <span className="text-islamic-brown font-medium">
                {prayer.name}
              </span>
              <span className="text-islamic-green font-bold">
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

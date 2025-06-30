
interface PrayerHeaderProps {
  currentTime: Date;
}

export const PrayerHeader = ({ currentTime }: PrayerHeaderProps) => {
  const formatTime = (date: Date) => {
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

  return (
    <div className="text-center space-y-4 animate-fade-in">
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🌙</span>
        </div>
        <h1 className="text-3xl font-bold text-islamic-green font-amiri">
          صديقي
        </h1>
        <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
          <span className="text-white text-sm">💚</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-4xl font-bold text-islamic-brown">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-islamic-green font-medium">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};

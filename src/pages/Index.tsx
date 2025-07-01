
import { useState, useEffect } from 'react';
import { PrayerHeader } from '@/components/PrayerHeader';
import { PrayerTimes } from '@/components/PrayerTimes';
import { SettingsPanel } from '@/components/SettingsPanel';
import { MedicationReminder } from '@/components/MedicationReminder';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home');
  const [prayerSettings, setPrayerSettings] = useState({
    fajr: true,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: true
  });
  const [appSettings, setAppSettings] = useState({
    timeFormat: '24h' as '12h' | '24h',
    reminderInterval: 15,
    alertSound: 'default',
    fontSize: 'medium' as 'small' | 'medium' | 'large'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <SettingsPanel 
            prayerSettings={prayerSettings}
            onPrayerSettingsChange={setPrayerSettings}
            appSettings={appSettings}
            onAppSettingsChange={setAppSettings}
          />
        );
      case 'medication':
        return <MedicationReminder appSettings={appSettings} />;
      default:
        return (
          <div className="space-y-6">
            <PrayerHeader currentTime={currentTime} timeFormat={appSettings.timeFormat} />
            <PrayerTimes prayerSettings={prayerSettings} reminderInterval={appSettings.reminderInterval} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen islamic-gradient">
      <div className="max-w-md mx-auto bg-white/10 min-h-screen backdrop-blur-sm">
        <div className="p-6 pb-24">
          {renderContent()}
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;

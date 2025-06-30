
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
          />
        );
      case 'medication':
        return <MedicationReminder />;
      default:
        return (
          <div className="space-y-6">
            <PrayerHeader currentTime={currentTime} />
            <PrayerTimes prayerSettings={prayerSettings} />
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

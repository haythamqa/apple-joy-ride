import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface MedicationReminderProps {
  appSettings: {
    timeFormat: '12h' | '24h';
    reminderInterval: number;
    alertSound: string;
    fontSize: 'small' | 'medium' | 'large';
    language: 'ar' | 'en';
  };
}

export const MedicationReminder = ({ appSettings }: MedicationReminderProps) => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'أ ملوديبيين',
      time: '09:00',
      enabled: true,
      interval: null,
      dailyCount: 1
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    time: '09:00',
    interval: null as number | null,
    dailyCount: 1
  });

  const isArabic = appSettings.language === 'ar';

  const texts = {
    ar: {
      settings: 'الإعدادات',
      medicationReminder: 'تذكير الدواء',
      addMedication: 'إضافة دواء',
      medicationName: 'اسم الدواء',
      reminderType: 'نوع التذكير',
      specificTime: 'وقت محدد',
      everyXHours: 'كل X ساعات',
      timesPerDay: 'مرات في اليوم',
      everyHowManyHours: 'كل كم ساعة',
      add: 'إضافة',
      cancel: 'إلغاء',
      everyHours: 'كل X ساعات',
      timesDaily: 'مرات يومياً'
    },
    en: {
      settings: 'Settings',
      medicationReminder: 'Medication Reminder',
      addMedication: 'Add Medication',
      medicationName: 'Medication Name',
      reminderType: 'Reminder Type',
      specificTime: 'Specific Time',
      everyXHours: 'Every X Hours',
      timesPerDay: 'Times Per Day',
      everyHowManyHours: 'Every How Many Hours',
      add: 'Add',
      cancel: 'Cancel',
      everyHours: 'Every X Hours',
      timesDaily: 'Times Daily'
    }
  };

  const t = texts[appSettings.language];

  const formatTime = (time: string) => {
    if (appSettings.timeFormat === '12h') {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'م' : 'ص';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minutes} ${ampm}`;
    }
    return time;
  };

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          name: newMedication.name,
          time: newMedication.time,
          enabled: true,
          interval: newMedication.interval,
          dailyCount: newMedication.dailyCount
        }
      ]);
      setNewMedication({ name: '', time: '09:00', interval: null, dailyCount: 1 });
      setShowAddForm(false);
    }
  };

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, enabled: !med.enabled } : med
    ));
  };

  return (
    <div className={`space-y-6 animate-fade-in ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-islamic-green mb-2">{t.settings}</h1>
        <p className="text-islamic-brown">{t.medicationReminder}</p>
      </div>

      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          {t.medicationReminder}
        </h2>

        {medications.map((medication) => (
          <div key={medication.id} className="flex items-center justify-between py-3 border-b border-islamic-green/10 last:border-b-0">
            <div className={`flex items-center space-x-3 ${isArabic ? 'space-x-reverse' : ''}`}>
              <Switch
                checked={medication.enabled}
                onCheckedChange={() => toggleMedication(medication.id)}
                className="data-[state=checked]:bg-islamic-green"
              />
              <div>
                <div className="text-lg font-medium text-islamic-brown">
                  {medication.name}
                </div>
                <div className="text-sm text-islamic-green">
                  {medication.interval 
                    ? `${isArabic ? 'كل' : 'Every'} ${medication.interval} ${isArabic ? 'ساعات' : 'hours'}`
                    : `${formatTime(medication.time)} ${medication.dailyCount > 1 ? `(${medication.dailyCount} ${isArabic ? 'مرات يومياً' : 'times daily'})` : ''}`
                  }
                </div>
              </div>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <div className="space-y-4 p-4 bg-white/30 rounded-lg border border-islamic-green/20">
            <input
              type="text"
              placeholder={t.medicationName}
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              className={`w-full p-3 rounded-lg border border-islamic-green/30 bg-white/50 text-islamic-brown placeholder-islamic-brown/60 ${isArabic ? 'text-right' : 'text-left'}`}
            />
            
            <div className="space-y-2">
              <label className="text-islamic-brown font-medium">{t.reminderType}</label>
              <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
                <Button
                  onClick={() => setNewMedication({ ...newMedication, interval: null })}
                  variant={newMedication.interval === null ? 'default' : 'outline'}
                  className={`flex-1 ${
                    newMedication.interval === null 
                      ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                      : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                  }`}
                >
                  {t.specificTime}
                </Button>
                <Button
                  onClick={() => setNewMedication({ ...newMedication, interval: 6 })}
                  variant={newMedication.interval !== null ? 'default' : 'outline'}
                  className={`flex-1 ${
                    newMedication.interval !== null 
                      ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                      : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                  }`}
                >
                  {t.everyXHours}
                </Button>
              </div>
            </div>

            {newMedication.interval === null ? (
              <>
                <input
                  type="time"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                  className={`w-full p-3 rounded-lg border border-islamic-green/30 bg-white/50 text-islamic-brown ${isArabic ? 'text-right' : 'text-left'}`}
                />
                <div className="space-y-2">
                  <label className="text-islamic-brown font-medium">{t.timesPerDay}</label>
                  <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
                    {[1, 2, 3, 4].map((count) => (
                      <Button
                        key={count}
                        onClick={() => setNewMedication({ ...newMedication, dailyCount: count })}
                        variant={newMedication.dailyCount === count ? 'default' : 'outline'}
                        className={`flex-1 ${
                          newMedication.dailyCount === count 
                            ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                            : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                        }`}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="text-islamic-brown font-medium">{t.everyHowManyHours}</label>
                <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
                  {[4, 6, 8, 12].map((interval) => (
                    <Button
                      key={interval}
                      onClick={() => setNewMedication({ ...newMedication, interval })}
                      variant={newMedication.interval === interval ? 'default' : 'outline'}
                      className={`flex-1 ${
                        newMedication.interval === interval 
                          ? 'bg-islamic-green hover:bg-islamic-green-light text-white' 
                          : 'border-islamic-green text-islamic-green hover:bg-islamic-green/10'
                      }`}
                    >
                      {interval}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className={`flex space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}>
              <Button
                onClick={handleAddMedication}
                className="flex-1 bg-islamic-green hover:bg-islamic-green-light text-white"
              >
                {t.add}
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1 border-islamic-green text-islamic-green hover:bg-islamic-green/10"
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className={`w-full p-4 border-2 border-dashed border-islamic-green/40 rounded-lg text-islamic-green hover:bg-islamic-green/5 transition-colors flex items-center justify-center space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}
          >
            <span className="text-2xl">+</span>
            <span className="font-medium">{t.addMedication}</span>
          </button>
        )}
      </div>

      {/* App Logo - Removed green heart icon */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-8 h-8 bg-islamic-green rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🌙</span>
          </div>
          <h3 className="text-lg font-bold text-islamic-green font-amiri">
            صديقي
          </h3>
        </div>
      </div>
    </div>
  );
};

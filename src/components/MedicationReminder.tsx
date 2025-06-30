
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const MedicationReminder = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'أ ملوديبيين',
      time: '09:00 ص',
      enabled: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    time: '09:00'
  });

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          name: newMedication.name,
          time: newMedication.time + ' ص',
          enabled: true
        }
      ]);
      setNewMedication({ name: '', time: '09:00' });
      setShowAddForm(false);
    }
  };

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, enabled: !med.enabled } : med
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-islamic-green mb-2">الإعدادات</h1>
        <p className="text-islamic-brown">تذكير الدواء</p>
      </div>

      <div className="prayer-card rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-islamic-green border-b border-islamic-green/20 pb-2">
          تذكير الدواء
        </h2>

        {medications.map((medication) => (
          <div key={medication.id} className="flex items-center justify-between py-3 border-b border-islamic-green/10 last:border-b-0">
            <div className="flex items-center space-x-3 space-x-reverse">
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
                  {medication.time}
                </div>
              </div>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <div className="space-y-4 p-4 bg-white/30 rounded-lg border border-islamic-green/20">
            <input
              type="text"
              placeholder="اسم الدواء"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-islamic-green/30 bg-white/50 text-islamic-brown placeholder-islamic-brown/60 text-right"
            />
            <input
              type="time"
              value={newMedication.time}
              onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
              className="w-full p-3 rounded-lg border border-islamic-green/30 bg-white/50 text-islamic-brown text-right"
            />
            <div className="flex space-x-2 space-x-reverse">
              <Button
                onClick={handleAddMedication}
                className="flex-1 bg-islamic-green hover:bg-islamic-green-light text-white"
              >
                إضافة
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1 border-islamic-green text-islamic-green hover:bg-islamic-green/10"
              >
                إلغاء
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full p-4 border-2 border-dashed border-islamic-green/40 rounded-lg text-islamic-green hover:bg-islamic-green/5 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
          >
            <span className="text-2xl">+</span>
            <span className="font-medium">إضافة دواء</span>
          </button>
        )}
      </div>

      {/* App Logo */}
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
      </div>
    </div>
  );
};

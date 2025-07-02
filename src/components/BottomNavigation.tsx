
interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  appSettings: {
    language: 'ar' | 'en';
  };
}

export const BottomNavigation = ({ activeTab, onTabChange, appSettings }: BottomNavigationProps) => {
  const isArabic = appSettings.language === 'ar';

  const tabs = [
    { 
      id: 'home', 
      label: isArabic ? 'الرئيسية' : 'Home', 
      icon: '🏠' 
    },
    { 
      id: 'settings', 
      label: isArabic ? 'الإعدادات' : 'Settings', 
      icon: '⚙️' 
    },
    { 
      id: 'medication', 
      label: isArabic ? 'الأدوية' : 'Medication', 
      icon: '💊' 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-islamic-green/20">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-islamic-green text-white shadow-lg'
                  : 'text-islamic-green hover:bg-islamic-green/10'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

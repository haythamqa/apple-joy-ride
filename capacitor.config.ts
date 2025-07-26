import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aaf784deca504129a5d140eecedee831',
  appName: 'apple-joy-ride',
  webDir: 'dist',
  server: {
    url: 'https://aaf784de-ca50-4129-a5d1-40eecedee831.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
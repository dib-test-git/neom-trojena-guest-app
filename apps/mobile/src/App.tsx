import React, { useEffect } from 'react';
import { I18nManager, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';

import { RootNavigator } from './navigation/RootNavigator';
import { initI18n } from './i18n';

/**
 * Trojena guest app entry point.
 *
 * Boot sequence:
 *  1. Detect preferred locale via react-native-localize.
 *  2. Initialise i18next with AR/EN bundles.
 *  3. Force RTL layout when the active locale is Arabic — see KAN-31 / KAN-51.
 *  4. Mount the root navigator.
 */
export default function App(): JSX.Element {
  useEffect(() => {
    const [best] = RNLocalize.findBestLanguageTag(['ar', 'en']) ?? [];
    const lang = best?.languageTag?.startsWith('ar') ? 'ar' : 'en';
    initI18n(lang);

    const shouldBeRTL = lang === 'ar';
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      // NOTE: A reload is required for RTL to fully apply on first launch.
      // Handled by the native bootstrapper in ios/AppDelegate.mm.
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

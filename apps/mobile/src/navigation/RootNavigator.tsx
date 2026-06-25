import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { LiftQueueScreen } from '../screens/LiftQueueScreen';
import { ReservationsScreen } from '../screens/ReservationsScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';

export type RootStackParamList = {
  LiftQueue: undefined;
  Reservations: undefined;
  Checkout: { cartId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="LiftQueue">
      <Stack.Screen
        name="LiftQueue"
        component={LiftQueueScreen}
        options={{ title: t('lift_queue.title') }}
      />
      <Stack.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{ title: t('reservations.title') }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: t('checkout.title') }}
      />
    </Stack.Navigator>
  );
}

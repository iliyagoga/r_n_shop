import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // Главный экран (app/index.js)
        options={{ title: 'Главная' }}
      />
      <Stack.Screen
        name="profile/[user]" // Динамический маршрут
      />
    </Stack>
  );
}

import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Главная' }} />
      <Stack.Screen name="profile/[user]" />
      <Stack.Screen name="chats" />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
}

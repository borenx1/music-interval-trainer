import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function RootLayout() {
  return (
    <>
      <Head>
        <title>Music Interval Trainer</title>
      </Head>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'ABC', headerShown: false }} />
      </Stack>
    </>
  );
}

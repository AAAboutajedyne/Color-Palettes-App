import { Stack } from "expo-router";
// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="index" />
    // </Stack>
    <Stack screenOptions={{ headerShown: false }} />
  );
}

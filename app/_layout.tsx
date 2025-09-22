import { Stack } from "expo-router";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { SplashScreenController } from "../screens/splash";

export default function Root() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { accessToken } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register-cliente" />
        <Stack.Screen name="register-validador" />
      </Stack.Protected>
    </Stack>
  );
}

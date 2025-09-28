import { Stack } from "expo-router";
import "../global.css";

import { Logo } from "@/components/Logo";
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
    <Stack
      screenOptions={{
        headerShown: false, // 👈 por defecto no mostrar header
      }}
    >
      {/* Pantallas privadas (logueado) */}
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Pantallas públicas (sin login) */}
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen
          name="login"
          options={{
            headerShown: true, // 👈 activar header
            title: "",
            headerTintColor: "#1E90FF",
            headerStyle: { backgroundColor: "#05081b" },
            headerShadowVisible: false,
            headerTitle: () => <Logo />,
          }}
        />
        <Stack.Screen
          name="register-cliente"
          options={{
            headerShown: true, // 👈 activar header
            title: "",
            headerTintColor: "#1E90FF",
            headerStyle: { backgroundColor: "#05081b" },
            headerShadowVisible: false,
            headerTitle: () => <Logo />,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

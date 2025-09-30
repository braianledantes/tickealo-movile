import { Logo } from "@/components/Logo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { Stack } from "expo-router";
import { Text as RNText } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";
import { SplashScreenController } from "../screens/splash";

export default function Root() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  (RNText as any).defaultProps = (RNText as any).defaultProps || {};
  (RNText as any).defaultProps.style = {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  };
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
        headerShown: false,
      }}
    >
      {/* Pantallas privadas (logueado) */}
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Pantallas públicas */}
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
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
            headerShown: true,
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

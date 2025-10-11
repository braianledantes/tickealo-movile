import { Logo } from "@/components/Logo";
import { ComprasProvider } from "@/context/ComprasContext";
import { SeguidoresProvider } from "@/context/SeguidoresContext";
import { ValidadorProvider } from "@/context/ValidadorContext";
import { useAuth } from "@/hooks/useAuth";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import { Text, View } from "react-native"; // ✅ agregado
import { AuthProvider } from "../context/AuthContext";
import "../global.css";
import { SplashScreenController } from "../screens/splash";

export default function Root() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Cargando fuentes...</Text>
      </View>
    );
  }

  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  };

  return (
    <AuthProvider>
      <SeguidoresProvider>
        <ComprasProvider>
          <ValidadorProvider>
            <SplashScreenController />
            <RootNavigator />
          </ValidadorProvider>
        </ComprasProvider>
      </SeguidoresProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { accessToken } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {accessToken ? (
        // ✅ Usuario logueado
        <Stack.Screen name="(app)" />
      ) : (
        // 🚪 Usuario no logueado
        <>
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
        </>
      )}
    </Stack>
  );
}

import { Logo } from "@/components/Layout/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export function RootNavigator() {
  const { accessToken } = useAuth();

  const screenOptions = {
    headerShown: true,
    title: "",
    headerTintColor: "#1E90FF",
    headerStyle: { backgroundColor: "#05081b" },
    headerShadowVisible: false,
    headerTitle: () => <Logo />,
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="login" options={screenOptions} />
        <Stack.Screen name="register-cliente" options={screenOptions} />
      </Stack.Protected>
    </Stack>
  );
}

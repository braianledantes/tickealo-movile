import Logo from "@/assets/images/logotipo.png";
import { Toast } from "@/components/Toast";
import { appFonts } from "@/config/fonts";
import { useAuth } from "@/hooks/context/useAuth";
import { AppProviders } from "@/providers/AppProviders";
import { SplashScreenController } from "@/screens/splash";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";

export default function Root() {
  const [fontsLoaded] = useFonts(appFonts);
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
    <AppProviders>
      <Toast />
      <SplashScreenController />
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const { accessToken } = useAuth();

  const screenOptions = {
    headerShown: true,
    title: "",
    headerTintColor: "#ffffff",
    headerStyle: { backgroundColor: "#05081b" },
    headerShadowVisible: false,
    headerTitle: () => (
      <Image
        source={Logo}
        style={{ width: 100, height: 40 }}
        contentFit="contain"
      />
    ),
    headerTitleAlign: "center",
  };

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Protected guard={!!accessToken}>
          <Stack.Screen
            name="(app)/(drawer)"
            options={{ headerShown: false, title: "Inicio" }}
          />
          <Stack.Screen
            name="(app)/perfil/index"
            options={{ ...screenOptions, title: "Perfil" }}
          />
          <Stack.Screen
            name="(app)/perfil/edit"
            options={{ ...screenOptions, title: "Editar Perfil" }}
          />
          <Stack.Screen
            name="(app)/perfil/edit-country"
            options={{ ...screenOptions, title: "Editar Nacionalidad" }}
          />
          <Stack.Screen
            name="(app)/perfil/edit-password"
            options={{ ...screenOptions, title: "Cambiar Contraseña" }}
          />
          <Stack.Screen
            name="(app)/info-evento"
            options={{ ...screenOptions, title: "Información del Evento" }}
          />
          <Stack.Screen
            name="(app)/compra/InicioCompra"
            options={{ ...screenOptions, title: "Inicio Compra" }}
          />
          <Stack.Screen
            name="(app)/compra/FinCompra"
            options={{ ...screenOptions, title: "Finalizar Compra" }}
          />
          <Stack.Screen
            name="(app)/compra/mi-compra"
            options={{ ...screenOptions, title: "Mi Compra" }}
          />
          <Stack.Screen
            name="(app)/ticket/compra/[compraId]"
            options={{ ...screenOptions, title: "Mi Ticket" }}
          />
          <Stack.Screen
            name="(app)/ticket/transferencia/[ticketId]"
            options={{ ...screenOptions, title: "Transferencia Bancaria" }}
          />
          <Stack.Screen
            name="(app)/ticket/clientes"
            options={{ ...screenOptions, title: "Clientes" }}
          />
          <Stack.Screen
            name="(app)/ticket/transferir-ticket"
            options={{ ...screenOptions, title: "Transferir Ticket" }}
          />
          <Stack.Screen
            name="(app)/validador/ticket/[ticketId]"
            options={{ ...screenOptions, title: "Validar Ticket" }}
          />
          <Stack.Screen
            name="(app)/validador/info-evento-validador"
            options={{ ...screenOptions, title: "Información del Evento" }}
          />
          <Stack.Screen
            name="(app)/validador/validar-entrada"
            options={{ ...screenOptions, title: "Validar Entrada" }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!accessToken}>
          <Stack.Screen
            name="(auth)/login"
            options={{ ...screenOptions, title: "Iniciar Sesión" }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{ ...screenOptions, title: "Registro" }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

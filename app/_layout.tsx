import { Toast } from "@/components/Toast";
import { appFonts } from "@/config/fonts";
import { RootNavigator } from "@/navigation/RootNavigator";
import { AppProviders } from "@/providers/AppProviders";
import { SplashScreenController } from "@/screens/splash";
import { useFonts } from "expo-font";
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

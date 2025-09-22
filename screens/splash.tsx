import { SplashScreen } from "expo-router";
import { useAuth } from "../context/AuthContext";

export function SplashScreenController() {
  const { isLoading } = useAuth();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}

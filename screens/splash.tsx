import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function SplashScreenController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  return null;
}

import { useAuth } from "@/hooks/useAuth";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function SplashScreenController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  return null;
}

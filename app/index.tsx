import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Esperar a que se cargue el estado de autenticación
    if (authState && authState.authenticated !== null) {
      if (authState.authenticated) {
        router.replace("./welcome" as any);
      } else {
        router.replace("./login" as any);
      }
    }
  }, [authState, router]);

  // Mostrar pantalla de carga mientras se verifica la autenticación
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000B",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
  },
});

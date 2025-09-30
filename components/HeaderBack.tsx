// src/components/HeaderBack.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/images/logotipo.png";

export const HeaderBack: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Flecha hacia atrás */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#90e0ef" />
      </TouchableOpacity>

      {/* Logo en el medio */}
      <Image
        source={Logo}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />

      {/* Espaciador para balancear layout */}
      <View style={{ width: 28 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010030",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

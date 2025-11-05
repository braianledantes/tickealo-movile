// src/components/HeaderBack.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../assets/images/logotipo.png";
import { Texto } from "../Texto";

export const HeaderBack: React.FC<{
  onHeight?: (h: number) => void;
  title?: string;
}> = ({ onHeight, title }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      onLayout={(e) => onHeight?.(e.nativeEvent.layout.height)}
    >
      {/* Flecha hacia atrás */}
      <TouchableOpacity
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/");
          }
        }}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Logo en el medio */}
      {title ? (
        <Texto semiBold className="text-white mt-1 text-xl tracking-wider">
          {title}
        </Texto>
      ) : (
        <Image
          source={Logo}
          style={{ width: 100, height: 40, resizeMode: "contain" }}
        />
      )}

      {/* Espaciador para balancear layout */}
      <View style={{ width: 28 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05081b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

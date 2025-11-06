import { renderIcon } from "@/components/Input/Icons";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export type IconButtonProps = {
  iconName?: string;
  iconType?: string;
  size?: number;
  color?: string;
  colorDisabled?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: any;
};

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconType = "Ionicons",
  size = 24,
  color = "#1E40AF",
  colorDisabled = "#0F1D4C",
  disabled = false,
  loading = false,
  onPress,
  style,
}) => {
  // ✅ Cargar fonts necesarias
  const [fontsLoaded] = useFonts({
    ...Entypo.font,
    ...Ionicons.font,
    ...Feather.font,
  });

  const finalColor = disabled ? colorDisabled : color;

  const shouldShowSpinner = loading || !fontsLoaded;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading || !fontsLoaded}
      style={[styles.button, style]}
    >
      {shouldShowSpinner ? (
        <ActivityIndicator size={size} color={colorDisabled} />
      ) : iconType === "Entypo" ? (
        <Entypo name={iconName as any} size={size} color={finalColor} />
      ) : iconType === "Ionicons" ? (
        <Ionicons name={iconName as any} size={size} color={finalColor} />
      ) : iconType === "Feather" ? (
        <Feather name={iconName as any} size={size} color={finalColor} />
      ) : (
        renderIcon(iconType, iconName, { color: finalColor, fontSize: size })
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

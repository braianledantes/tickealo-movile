import { renderIcon } from "@/components/Input/Icons";
import { Ionicons } from "@expo/vector-icons";
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
  onPress: () => void;
  style?: any;
};

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconType,
  size = 24,
  color = "#1E40AF",
  colorDisabled = "#0F1D4C",
  disabled = false,
  loading = false,
  onPress,
  style,
}) => {
  const finalColor = disabled ? colorDisabled : loading ? color : color;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, style]}
    >
      {loading ? (
        <ActivityIndicator size={size} color={colorDisabled} />
      ) : iconType ? (
        renderIcon(iconType, iconName, { color: finalColor, fontSize: size })
      ) : iconName ? (
        <Ionicons name={iconName as any} size={size} color={finalColor} />
      ) : null}
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

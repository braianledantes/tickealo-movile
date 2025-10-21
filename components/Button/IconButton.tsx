import { renderIcon } from "@/components/Input/Icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export type IconButtonProps = {
  iconName?: string;
  iconType?: string;
  size?: number;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: any;
};

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconType,
  size = 24,
  disabled = false,
  loading = false,
  onPress,
  style,
}) => {
  const finalColor = disabled ? "#0F1D4C" : loading ? "#1E40AF" : "#1E40AF";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#4da6ff" />
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

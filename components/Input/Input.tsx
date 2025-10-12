import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "../Icons";

export type InputProps = {
  value: string;
  onChangeValue: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "phone" | "default";
  iconName?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  containerStyle?: object;
  inputStyle?: object;
};

export function Input({
  value,
  onChangeValue,
  placeholder = "",
  type = "default",
  iconName,
  secureTextEntry,
  keyboardType,
  containerStyle,
  inputStyle,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Determinar qué ícono mostrar según el tipo
  const renderIcon = () => {
    switch (type) {
      case "email":
        return <EmailIcon style={styles.iconCustom} />;
      case "password":
        return <KeyIcon style={styles.iconCustom} />;
      case "phone":
        return <PhoneIcon style={styles.iconCustom} />;
      case "text":
        return <UserIcon style={styles.iconCustom} />;
      default:
        return iconName ? (
          <Ionicons
            name={iconName}
            size={20}
            color="#A5A6AD"
            style={styles.icon}
          />
        ) : null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.inputFocused,
        containerStyle,
      ]}
    >
      {renderIcon()}

      <TextInput
        value={value}
        onChangeText={onChangeValue}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        secureTextEntry={type === "password" && !showPassword}
        keyboardType={
          keyboardType ??
          (type === "email"
            ? "email-address"
            : type === "phone"
              ? "phone-pad"
              : "default")
        }
        style={[styles.input, inputStyle]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {type === "password" && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeButton}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: "#080C22",
    borderWidth: 2,
    borderColor: "#0F1D4C",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
  },
  inputFocused: {
    borderColor: "#1E40AF",
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  iconCustom: {
    color: "#fff",
    backgroundColor: "#393d4e",
    padding: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  eyeButton: {
    marginLeft: 8,
  },
});

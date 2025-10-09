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
  type?: "text" | "password" | "email" | "phone" | "default";
  onChangeValue: (value: string) => void;
  placeholder?: string;
};

export function Input({
  type = "default",
  value,
  onChangeValue,
  placeholder = "",
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, isFocused && styles.inputFocused]}>
      {type === "email" && <EmailIcon style={styles.icon} />}
      {type === "password" && <KeyIcon style={styles.icon} />}
      {type === "phone" && <PhoneIcon style={styles.icon} />}
      {type === "text" && <UserIcon style={styles.icon} />}

      <TextInput
        keyboardType={type === "email" ? "email-address" : "default"}
        style={styles.input}
        value={value}
        onChangeText={onChangeValue}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={type === "password" && !isPasswordVisible} // 👈 se oculta por defecto
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {type === "password" && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
        >
          {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
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
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: "#080C22",
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#0F1D4C",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontFamily: "Poppins_400Regular",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inputFocused: {
    borderColor: "#1E40AF",
    borderWidth: 2,
  },
  icon: {
    color: "#fff",
    backgroundColor: "#393d4e",
    padding: 8,
    borderRadius: 50,
    marginLeft: -8,
    marginRight: 8,
  },
});

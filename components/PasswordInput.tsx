import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { KeyIcon } from "./Icons";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
}

export function PasswordInput({
  value,
  onChangeText,
  placeholder = "Contraseña",
  style,
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, isFocused && styles.inputFocused, style]}>
      <KeyIcon style={styles.icon} />
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        secureTextEntry={!isPasswordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={togglePasswordVisibility}
      >
        <Ionicons
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2f2f2fff",
    borderRadius: 100,
    paddingHorizontal: 16,
    backgroundColor: "#080C22",
  },
  input: {
    flex: 1,
    borderColor: "#2f2f2fff",
    paddingVertical: 16,
    fontSize: 16,
    color: "#fff",
  },
  eyeButton: {
    padding: 4,
  },
  inputFocused: {
    borderColor: "#007AFF",
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

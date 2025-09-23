import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "./Icons";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type !== "password",
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, isFocused && styles.inputFocused]}>
      {type === "email" && <EmailIcon style={styles.icon} />}
      {type === "password" && <KeyIcon style={styles.icon} />}
      {type === "phone" && <PhoneIcon style={styles.icon} />}
      {type === "text" && <UserIcon style={styles.icon} />}
      <TextInput
        keyboardType="email-address"
        style={[styles.input]}
        value={value}
        onChangeText={onChangeValue}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={type === "password" && !isPasswordVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {type === "password" && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </TouchableOpacity>
      )}
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

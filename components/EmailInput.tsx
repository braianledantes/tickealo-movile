import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { EmailIcon } from "./Icons";

interface EmailInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
}

export function EmailInput({
  value,
  onChangeText,
  placeholder = "Email",
}: EmailInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.inputFocused]}>
      <EmailIcon style={styles.icon} />
      <TextInput
        keyboardType="email-address"
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
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

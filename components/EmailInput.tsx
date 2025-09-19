import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

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
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A5A6AD"
        keyboardType="email-address"
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
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2f2f2fff",
    borderRadius: 100,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#080C22",
    color: "#fff",
  },
  inputFocused: {
    borderColor: "#007AFF",
  },
});

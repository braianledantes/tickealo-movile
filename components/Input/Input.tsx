import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { renderIcon } from "./Icons";

export type InputProps = {
  value?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "phone" | "default";
  iconName?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  containerStyle?: object;
  inputStyle?: object;
  autofocus?: boolean;
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
  autofocus,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <View
      className={`flex-row items-center px-3 py-2 rounded-full bg-[#080C22] border-2 ${
        isFocused ? "border-blue-800" : "border-[#0F1D4C]"
      }`}
      style={containerStyle}
    >
      {/* Ícono izquierdo */}
      {renderIcon(type, iconName)}

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
        className="flex-1 text-white text-base py-1"
        style={[{ fontFamily: "Poppins_400Regular" }, inputStyle]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autofocus}
      />

      {/* Ícono de visibilidad de contraseña */}
      {type === "password" && (
        <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
          {showPassword ? renderIcon("eye") : renderIcon("eye-off")}
        </TouchableOpacity>
      )}
    </View>
  );
}

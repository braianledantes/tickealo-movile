import React from "react";
import { Text, View } from "react-native";
import { renderIcon } from "./Icons";

type InputDisplayProps = {
  value: string;
  placeholder?: string;
  iconName?: string;
};

export function InputDisplay({
  value,
  placeholder,
  iconName,
}: InputDisplayProps) {
  return (
    <View className="flex-row items-center px-6 py-2 rounded-full bg-[#0B0F29] border-2 border-[#0F1D4C] opacity-70">
      {/* Ícono izquierdo */}
      {renderIcon("", iconName)}

      {/* Texto “deshabilitado” */}
      <Text
        className={`flex-1 text-[#A5A6AD] text-base py-1`}
        style={{ fontFamily: "Poppins_400Regular" }}
      >
        {value || placeholder}
      </Text>
    </View>
  );
}

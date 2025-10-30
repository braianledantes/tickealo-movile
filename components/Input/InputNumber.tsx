import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Texto } from "../Texto";

export type InputNumberProps = {
  value?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  containerStyle?: object;
  inputStyle?: object;
  autofocus?: boolean;
  prefix?: string;
  image?: string;
};

export function InputNumber({
  value = "",
  onChangeValue,
  placeholder = "Teléfono",
  containerStyle,
  inputStyle,
  autofocus = false,
  prefix = "54",
}: InputNumberProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [removePrefix, setRemovePrefix] = useState(false); // controla si el usuario decidió ocultar el prefijo

  useEffect(() => {
    const numeric = value.replace(/\D/g, "");
    setInternalValue(numeric);
  }, [value]);

  const handleChange = (text: string) => {
    const clean = text.replace(/\D/g, "");
    setInternalValue(clean);
    onChangeValue?.(clean);
  };

  const handleClear = () => {
    setInternalValue("");
    onChangeValue?.("");
    setRemovePrefix(true); // usuario decide ocultar prefijo
  };

  return (
    <>
      <View
        className={`flex-row items-center px-3 py-4 rounded-full bg-[#080C22] border-2 ${
          isFocused ? "border-blue-800" : "border-[#0F1D4C]"
        }`}
        style={containerStyle}
      >
        {/* Mostrar prefijo solo si no lo ocultó el usuario */}
        {!removePrefix && prefix && (
          <View className="flex-row items-center mr-2 p-1 border-r border-white/10">
            <IconButton
              iconType="Entypo"
              iconName="plus"
              color="white"
              size={20}
              style={{ padding: 0 }}
            />
            <Text className="text-white text-xl px-2 font-semibold">
              {prefix}
            </Text>
          </View>
        )}

        {/* Input del número */}
        <TextInput
          value={internalValue}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#A5A6AD"
          keyboardType="phone-pad"
          className="flex-1 text-white text-xl py-1"
          style={[{ fontFamily: "Poppins_400Regular" }, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autofocus}
        />
      </View>

      {/* Botón “prefijo incorrecto” */}
      <View className="flex-row justify-between px-3 mt-2">
        <Texto className="text-[#999]">¿Prefieres sin prefijo?</Texto>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleClear}>
            <Texto className="text-[#BD4C4C]">Borrar</Texto>
          </TouchableOpacity>
          <IconButton
            iconType="Feather"
            iconName="x"
            color="#BD4C4C"
            size={15}
            onPress={handleClear}
            style={{ marginLeft: 4, padding: 0 }}
          />
        </View>
      </View>
    </>
  );
}

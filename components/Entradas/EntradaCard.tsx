import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

type EntradaCardProps = {
  tipo: string;
  precio: number;
  onPress?: () => void;
  right?: React.ReactNode;
  priceValueOverride?: number;
  priceSuffixText?: string;
  disabled?: boolean;
};

export const EntradaCard: React.FC<EntradaCardProps> = ({
  tipo,
  precio,
  onPress,
  right,
  priceValueOverride,
  priceSuffixText,
  disabled = false,
}) => {
  const tipoColor = tipo.toLowerCase() === "vip" ? "#4da6ff" : "#77c3ff";

  const Content = (
    <View style={stylesDynamic(disabled)}>
      <LinearGradient
        colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBar}
      />

      {/* Izquierda */}
      <View className="flex-1 py-[14px] px-5">
        <View className="flex-row items-center gap-1.5">
          <Texto semiBold className="text-[#bbb] text-[14px] tracking-[0.5px]">
            ENTRADA
          </Texto>
          <Texto
            className="text-[20px] font-bold mb-[5px]"
            style={{ color: tipoColor }}
          >
            {tipo.toUpperCase()}
          </Texto>
        </View>

        <View className="flex-row items-end mt-1">
          <Text className="text-white text-[20px] font-bold tracking-[1px]">
            $
            {Number(priceValueOverride ?? precio).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Texto className="text-[#999] text-[12px] mb-[2px]">
            {" "}
            {priceSuffixText ?? "por persona"}
          </Texto>
        </View>
      </View>

      {/* Separador */}
      <View className="w-[1px] h-[70%] border-l border-dashed border-[#666]" />

      {/* Derecha */}
      <View className="w-[60px] justify-center items-center bg-[#0b1030]">
        {right ?? <Ionicons name="add" size={24} color="#fff" />}
      </View>

      {/* Overlay si está deshabilitado */}
      {disabled && <View style={styles.disabledOverlay} />}
    </View>
  );

  return onPress && !disabled ? (
    <TouchableOpacity
      className="my-2 overflow-hidden"
      activeOpacity={0.9}
      onPress={onPress}
    >
      {Content}
    </TouchableOpacity>
  ) : (
    <View className="my-2 overflow-hidden">{Content}</View>
  );
};
const stylesDynamic = (disabled: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#0b1030",
      borderTopEndRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: disabled ? "rgba(27, 3, 82, 0.2)" : "#1b1e5e",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 5,
    },
  }).card;

const styles = StyleSheet.create({
  gradientBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

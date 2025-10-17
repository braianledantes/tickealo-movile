import * as ClipBoard from "expo-clipboard";
import { Alert, Pressable, Text } from "react-native";
import React from "react";

// Fila individual que se puede copiar
export function BankRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  const copy = async () => {
    await ClipBoard.setStringAsync(value);
    Alert.alert("Copiado", `${label} copiado al portapapeles`);
  };

  return (
    <Pressable onLongPress={copy} className="mt-1.5">
      <Text className="text-slate-300 text-base mt-1.5">
        {label}: <Text className="text-white font-bold">{value}</Text>
      </Text>
      <Text className="text-xs text-indigo-300">
        Mantener presionado para copiar
      </Text>
    </Pressable>
  );
}

// Función de formato ARS
export function formatARS(value: number) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value.toLocaleString("es-AR")}`;
  }
}

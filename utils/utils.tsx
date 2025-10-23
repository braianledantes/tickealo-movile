import { Copy } from "@/components/Input/Icons";
import { Texto } from "@/components/Texto";
import * as ClipBoard from "expo-clipboard";
import React, { useState } from "react";
import { Pressable } from "react-native";

// Fila individual que se puede copiar
export function BankRow({ label, value }: { label: string; value?: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const copy = async () => {
    await ClipBoard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Pressable onLongPress={copy} className="">
      <Texto semiBold className="text-slate-300 text-base">
        {label}:{" "}
        <Texto bold className="text-white mr-5">
          {value}{" "}
          {copied && <Texto className="text-[#999] text-sm">Copiado</Texto>}
        </Texto>
      </Texto>
    </Pressable>
  );
}

//Copia todo un bloque de texto
export function CopyAll({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const handleCopy = async () => {
    await ClipBoard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Pressable onPress={handleCopy} className="flex-row items-center space-x-2">
      <Copy />
      {copied && (
        <Texto className="text-[#999] text-sm ml-1">Copiado exitosamente</Texto>
      )}
    </Pressable>
  );
}

// Función de formato ARS
export function formatARS(value: string | number) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value));
  } catch {
    return `$${value.toLocaleString("es-AR")}`;
  }
}

export function formatDate(timestamp: string | number) {
  const date =
    typeof timestamp === "number" ? new Date(timestamp) : new Date(timestamp);
  return (
    date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

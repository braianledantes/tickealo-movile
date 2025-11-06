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

export function formatDate(
  timestamp: string | number | undefined,
  options: {
    date?: boolean; // incluir fecha
    time?: boolean; // incluir hora
  } = { date: true, time: true },
) {
  const date =
    typeof timestamp === "number" ? new Date(timestamp) : new Date(timestamp);

  const parts: string[] = [];

  if (options.date) {
    parts.push(
      date.toLocaleDateString("es-AR", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    );
  }

  if (options.time) {
    parts.push(
      date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }

  return parts.join(" ");
}

//Obtener estadisticas en barra  de cada comentario o ventas de validador
export function porcentaje(valorInicial: number, total: number) {
  const porcentajeFinal =
    total > 0 ? Math.round((valorInicial / total) * 100) : 0;

  return porcentajeFinal;
}

//Obtener hace cuanto fue publicado un comentario, pasadas las 24hs tira la fecha
export function recentTime(comentario: Date) {
  const fechaComentario = new Date(comentario);
  const ahora = new Date();
  const diferenciaMs = ahora.getTime() - fechaComentario.getTime();
  const diferenciaMin = Math.floor(diferenciaMs / (1000 * 60));
  const diferenciaHoras = Math.floor(diferenciaMin / 60);

  let fechaFormateada: string;

  if (diferenciaHoras < 24) {
    if (diferenciaMin < 1) {
      fechaFormateada = "Justo ahora";
    } else if (diferenciaMin < 60) {
      fechaFormateada = `Hace ${diferenciaMin} min`;
    } else if (diferenciaHoras === 1) {
      fechaFormateada = "Hace 1 h";
    } else {
      fechaFormateada = `Hace ${diferenciaHoras} h`;
    }
  } else {
    fechaFormateada = fechaComentario.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return fechaFormateada;
}

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Texto } from "../Texto";

interface EventTimerProps {
  fechaFin: string;
}

export function EventTimer({ fechaFin }: EventTimerProps) {
  const [tiempoRestante, setTiempoRestante] = useState<{
    meses: number;
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
  }>({
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const calcularTiempo = () => {
      const fin = new Date(fechaFin).getTime();
      const ahora = Date.now();
      const diferencia = fin - ahora;

      if (diferencia <= 0) {
        setTiempoRestante({
          meses: 0,
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        return;
      }

      const segundosTotales = Math.floor(diferencia / 1000);
      const segundos = segundosTotales % 60;
      const minutos = Math.floor((segundosTotales / 60) % 60);
      const horas = Math.floor((segundosTotales / (60 * 60)) % 24);
      const diasTotales = Math.floor(segundosTotales / (60 * 60 * 24));

      const meses = Math.floor(diasTotales / 30);
      const dias = diasTotales % 30;

      setTiempoRestante({ meses, dias, horas, minutos, segundos });
    };

    calcularTiempo();
    const interval = setInterval(calcularTiempo, 1000);
    return () => clearInterval(interval);
  }, [fechaFin]);

  const { meses, dias, horas, minutos, segundos } = tiempoRestante;

  const eventoFinalizado =
    meses === 0 && dias === 0 && horas === 0 && minutos === 0 && segundos === 0;

  const partes: string[] = [];
  if (meses > 0) partes.push(`${meses} mes${meses !== 1 ? "es" : ""}`);
  if (dias > 0) partes.push(`${dias} día${dias !== 1 ? "s" : ""}`);
  if (horas > 0) partes.push(`${horas.toString().padStart(2, "0")}h`);
  if (minutos > 0) partes.push(`${minutos.toString().padStart(2, "0")}m`);
  if (segundos > 0 || partes.length === 0)
    partes.push(`${segundos.toString().padStart(2, "0")}s`);

  return (
    <LinearGradient
      colors={["#0f1a4a", "#0b1030", "#0f1a4a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 justify-center py-6 items-center"
    >
      <Texto
        bold
        style={{
          color: eventoFinalizado ? "#CAF0F8" : "white",
        }}
        className="text-center uppercase tracking-wider z-10"
      >
        {eventoFinalizado
          ? "Evento finalizado"
          : `Faltan ${partes.join(" : ")}`}
      </Texto>
    </LinearGradient>
  );
}

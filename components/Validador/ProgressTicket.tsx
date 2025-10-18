import { EventoDto } from "@/api/dto/evento.dto";
import { TicketDto } from "@/api/dto/ticket-validador";
import { Texto } from "@/components/Texto";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  evento?: EventoDto | null;
  ticketsTotalesEvento?: TicketDto[];
}

export default function ProgressTicket({
  evento,
  ticketsTotalesEvento = [],
}: Props) {
  if (!evento) {
    return (
      <Texto className="text-[#aaa]">Cargando información del evento...</Texto>
    );
  }

  const entradas = evento.entradas ?? [];
  const totalCapacidad = evento.capacidad ?? 0;
  const stockRestante = evento.stockEntradas ?? 0;

  if (entradas.length === 0) {
    return (
      <Texto className="text-[#aaa]">
        No se encontraron entradas para este evento.
      </Texto>
    );
  }

  // Tickets por estado
  const ticketsPendientes = ticketsTotalesEvento.filter(
    (t) => t.estado === "PENDIENTE_VALIDACION",
  );
  const ticketsRechazados = ticketsTotalesEvento.filter(
    (t) => t.estado === "ANULADA",
  );
  const ticketsValidadosTotales = ticketsTotalesEvento.filter(
    (t) => t.estado === "VALIDADO",
  );

  // Total vendidos
  const totalVendidos = totalCapacidad - stockRestante;

  // Entradas por tipo con cantidad vendida y stock
  const entradasPorTipo: {
    [tipo: string]: { vendidos: number; stock: number };
  } = {};
  entradas.forEach((e) => {
    const stock = e.cantidad ?? 0; // cantidad total de entradas
    const vendidos = stock - (e.stock ?? 0); // entradas vendidas
    entradasPorTipo[e.tipo] = { vendidos, stock };
  });

  const porcentajeEvento =
    totalCapacidad > 0
      ? Math.round((ticketsValidadosTotales.length / totalCapacidad) * 100)
      : 0;

  return (
    <View className="mt-6 px-4">
      {/* Progreso total del evento */}
      <View style={styles.card}>
        <Texto className="text-[#7a86b6] text-lg font-bold mb-2">
          Progreso total del evento
        </Texto>

        <View className="flex-row items-center justify-between mb-2">
          <Texto className="text-[#ddd] text-sm">
            {ticketsValidadosTotales.length} / {totalCapacidad} tickets
          </Texto>
          <Texto className="text-[#4da6ff] font-bold text-sm">
            {porcentajeEvento}%
          </Texto>
        </View>

        <View style={styles.barraFondo}>
          <LinearGradient
            colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barraProgreso, { width: `${porcentajeEvento}%` }]}
          />
        </View>
      </View>

      {/* Estadísticas adicionales */}
      <View className="mt-4 gap-2 px-4">
        {/* Tickets Pendientes */}
        <View className="flex-row justify-between">
          <Texto bold className="text-[#999] text-md ">
            Pendientes
          </Texto>
          <Texto bold className="text-[#999] text-md">
            {ticketsPendientes.length}
          </Texto>
        </View>

        {/* Tickets Rechazados */}
        <View className="flex-row justify-between">
          <Texto bold className="text-[#999] text-md">
            Rechazados
          </Texto>
          <Texto bold className="text-[#999] text-md">
            {ticketsRechazados.length}
          </Texto>
        </View>

        {/* Tickets por tipo (tipo | vendidos / stock) */}
        {Object.entries(entradasPorTipo).map(([tipo, { vendidos, stock }]) => (
          <View key={tipo} className="flex-row justify-between mb-1">
            <Texto bold className="text-[#ddd] text-md ">
              {tipo}
            </Texto>
            <Texto bold className="text-[#4da6ff] text-md">
              {vendidos} / {stock}
            </Texto>
          </View>
        ))}

        {/* Total vendidos */}
        <View className="flex-row justify-between">
          <Texto bold className="text-[#7a86b6] text-md">
            Total vendidos
          </Texto>
          <Texto bold className="text-[#7a86b6] text-md">
            {totalVendidos}
          </Texto>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0c0f2b",
    padding: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  barraFondo: {
    width: "100%",
    height: 16,
    backgroundColor: "#1b1b40",
    borderRadius: 8,
    overflow: "hidden",
  },
  barraProgreso: {
    height: "100%",
    borderRadius: 8,
  },
});

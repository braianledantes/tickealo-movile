import { EventoDto } from "@/api/dto/evento.dto";
import { TicketDto } from "@/api/dto/ticket-validador";
import { Texto } from "@/components/Texto";
import { formatDate } from "@/utils/utils";
import React from "react";
import { ScrollView, View } from "react-native";
interface Props {
  evento?: EventoDto | null;
  ticketsValidados?: TicketDto[];
}

export default function HistorialTicket({
  evento,
  ticketsValidados = [],
}: Props) {
  if (!evento) {
    return (
      <Texto className="text-[#aaa]">Cargando información del evento...</Texto>
    );
  }

  const totalValidadosUsuario = ticketsValidados.length;

  return (
    <View className="px-4 mb-8">
      <View className="flex flex-row items-center justify-between px-4 my-4">
        <Texto bold className="text-[#A5A6AD] text-xl">
          Tickets validados por ti
        </Texto>
        <Texto bold className="text-[#A5A6AD] text-xl">
          {totalValidadosUsuario}
        </Texto>
      </View>
      <ScrollView className="">
        {totalValidadosUsuario === 0 ? (
          <Texto className="text-[#aaa] italic px-4">
            No has validado tickets aún.
          </Texto>
        ) : (
          ticketsValidados.map((ticket) => (
            <View
              key={ticket.id}
              className="bg-[#0c0f2b] px-6 py-4 rounded-[30px] mb-4"
            >
              <View className="flex flex-row items-center justify-between">
                <Texto bold className="text-[#7a86b6] tracking-wider">
                  CODIGO VALIDADO: {ticket.codigoAlfanumerico}
                </Texto>
                <Texto bold className="text-[#999] tracking-wider">
                  #{ticket.id}
                </Texto>
              </View>
              <Texto className="text-[#fff] text-sm">
                Fecha: {formatDate(ticket.updatedAt)}
              </Texto>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

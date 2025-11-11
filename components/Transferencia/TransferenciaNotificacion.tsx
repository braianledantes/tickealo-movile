import { TransferenciaDto } from "@/api/dto/compras.dto";
import { useTicket } from "@/hooks/context/useTicket";
import { useToast } from "@/hooks/context/useToast";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";

interface Props {
  ticket: TransferenciaDto;
}

export const TransferenciaNotificacion: React.FC<Props> = ({ ticket }) => {
  const {
    aceptarTransferencia,
    rechazarTransferencia,
    loadingAceptado,
    loadingRechazo,
  } = useTicket();
  const { showToast } = useToast();

  const handleAceptarTransferencia = async () => {
    if (!ticket) return;
    const transferenciaId = ticket.id;
    const success = await aceptarTransferencia(Number(transferenciaId));
    if (success) {
      showToast("success", "¡Listo!", "Transferencia aceptad. A disfrutar!");
    } else {
      showToast("error", "Error", "Intentelo mas tarde.");
    }
  };

  const handleRechazarTransferencia = async () => {
    if (!ticket) return;
    const transferenciaId = ticket.id;
    const success = await rechazarTransferencia(Number(transferenciaId));
    if (success) {
      showToast("success", "¡Listo!", "Transferencia rechazada.");
    } else {
      showToast("error", "Error", "Intentelo más tarde.");
    }
  };

  return (
    <>
      {ticket.status === "pendiente" ? (
        <View className="m-2 my-4 shadow-lg shadow-black/30 pb-4 border-b-[0.5px] border-white/20">
          {/* Título */}
          <Texto semiBold className="text-white text-base tracking-wide">
            Recibiste una transferencia!
          </Texto>

          {/* Usuario */}
          <View className="flex-row items-center mt-4 bg-[#0c0f2b] p-3 rounded-full">
            <UsuarioPerfil
              imagenPerfilUrl={ticket.clienteEmisor.imagenPerfilUrl}
              username={ticket.clienteEmisor.nombre}
              icono="w-9 h-9"
              className="p-0"
            />

            <View className="ml-3">
              <Texto semiBold className="text-white text-sm">
                {ticket.clienteEmisor.nombre} {ticket.clienteEmisor.apellido}
              </Texto>
              <Texto className="text-white/50 text-xs mt-1 tracking-wider">
                quiere transferirte su entrada
              </Texto>
            </View>
          </View>

          {/* Botones */}
          <View className="flex-row justify-between items-center mt-5">
            <TouchableOpacity
              onPress={handleRechazarTransferencia}
              disabled={loadingRechazo}
            >
              <Texto semiBold className="text-[#BD4C4C] text-sm tracking-wider">
                Rechazar
              </Texto>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAceptarTransferencia}
              disabled={loadingAceptado}
            >
              <Texto semiBold className="text-[#00ff9d] tracking-wider text-sm">
                Aceptar
              </Texto>
            </TouchableOpacity>
          </View>
        </View>
      ) : ticket.status === "aceptada" ? (
        <View className="flex-row items-center m-2 bg-[#0c0f2b] p-3 rounded-full">
          <UsuarioPerfil
            imagenPerfilUrl={ticket.clienteEmisor.imagenPerfilUrl}
            username={ticket.clienteEmisor.nombre}
            icono="w-7 h-7"
            className="p-0"
          />

          <Texto semiBold className="text-white text-sm ml-3">
            Transferencia de {ticket.clienteEmisor.nombre}{" "}
            {ticket.clienteEmisor.apellido}
          </Texto>
        </View>
      ) : null}
    </>
  );
};

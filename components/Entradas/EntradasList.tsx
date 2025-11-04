import { EventoDto } from "@/api/dto/evento.dto";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Texto } from "../Texto";
import { EntradaCard } from "./EntradaCard";

type EntradaCardProps = {
  evento: EventoDto;
};

export const EntradaList: React.FC<EntradaCardProps> = ({ evento }) => {
  const router = useRouter();
  return (
    <>
      <View className="mt-4 px-4 mb-5">
        {evento.entradas?.length ? (
          evento.entradas.map((entrada) => (
            <EntradaCard
              key={entrada.id}
              fechaFin={evento.finAt}
              tipo={entrada.tipo}
              precio={entrada.precio}
              disabled={evento.stockEntradas === 0 || entrada.stock === 0}
              onPress={() =>
                router.push({
                  pathname: "/(app)/compra/InicioCompra",
                  params: {
                    entradaId: entrada.id.toString(),
                    nombre: entrada.tipo,
                    precio: String(entrada.precio),
                    portadaUrl: evento.bannerUrl ?? "",
                    eventoId: String(evento.id),
                    cantEntradas: entrada.stock,
                  },
                })
              }
              right={
                evento.stockEntradas === 0 || entrada.stock === 0 ? (
                  <View className="items-center">
                    <Texto bold className="text-white text-sm">
                      NO HAY
                    </Texto>
                    <Texto bold className="text-white text-sm">
                      CUPOS
                    </Texto>
                  </View>
                ) : undefined
              }
            />
          ))
        ) : (
          <Texto className="text-gray-400 text-center italic mt-2">
            No hay entradas disponibles por ahora.
          </Texto>
        )}
      </View>
    </>
  );
};

import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { HeartOutlinedIcon } from "@/components/Input/Icons";
import { Texto } from "@/components/Texto";
import { useSeguidores } from "@/hooks/useSeguidores";
import { abrirEnMaps } from "@/utils/abrirMaps";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { EventoDto } from "@/api/dto/evento.dto";
import { Image, TouchableOpacity, View } from "react-native";
import defaultEvent from "../../assets/images/defaultEvent.jpg";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
  view?: boolean;
};

export function EventInfo({ evento, productoraId, view = true }: Props) {
  const { seguir, dejarSeguir } = useSeguidores();
  const [estaSiguiendo, setEstaSiguiendo] = useState<boolean | null>(null);

  useEffect(() => {
    if (evento && estaSiguiendo === null) {
      setEstaSiguiendo(!!evento.productora?.isSeguido);
    }
  }, [evento, estaSiguiendo]);

  const banner = evento.bannerUrl?.trim()
    ? { uri: evento.bannerUrl }
    : defaultEvent;

  return (
    <View>
      <Image
        source={banner}
        className={`w-full ${evento.bannerUrl ? "aspect-[11/4]" : "h-44"} ${!evento.bannerUrl ? "opacity-80" : ""}`}
        resizeMode="cover"
      />

      {/* Seguir / Dejar de seguir productora */}
      {view && (
        <View
          className="flex-row items-center justify-between mt-3 mx-4 gap-2"
          style={{ minHeight: 56 }}
        >
          {estaSiguiendo === false && (
            <Button
              title="Seguir Productora"
              onPress={async () => {
                if (!productoraId) return;
                await seguir(productoraId);
                setEstaSiguiendo(true);
              }}
              className="flex-1"
            />
          )}

          {estaSiguiendo === true && (
            <SecondaryButton
              title="Dejar de seguir"
              onPress={async () => {
                if (!productoraId) return;
                await dejarSeguir(productoraId);
                setEstaSiguiendo(false);
              }}
              className="flex-1"
            />
          )}

          <TouchableOpacity className="p-2 bg-[#1b1b40] rounded-full item-center justify-center">
            <HeartOutlinedIcon />
          </TouchableOpacity>
        </View>
      )}

      {/* Descripción */}
      <View className="px-4 mt-4">
        <Texto className="text-[#cfe3ff] text-2xl font-bold mb-1 tracking-wide">
          {evento.nombre}
        </Texto>
        <TouchableOpacity
          className="flex-row items-center mb-2"
          onPress={() =>
            abrirEnMaps(evento?.lugar?.latitud, evento?.lugar?.longitud)
          }
        >
          <Ionicons
            name="location-outline"
            size={18}
            color="#4da6ff"
            className="mr-1.5"
          />
          <Texto semiBold className="text-[#4da6ff] text-center text-md">
            {evento.lugar?.direccion
              ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
              : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
          </Texto>
        </TouchableOpacity>
        <Texto className="text-[#ddd] text-md leading-5">
          {evento.descripcion}
        </Texto>
        <Texto semiBold className="text-[#20347F] text-lg mt-2">
          Organizado por {evento.productora.nombre}
        </Texto>
      </View>

      {/* Fecha */}
      <View className="mt-6 px-4 pt-3 border-t border-t-[#1b1b40]">
        <Texto className="text-[#A5A6AD] font-bold text-lg uppercase tracking-wide">
          {(() => {
            const date = new Date(evento.inicioAt);
            const fecha = date
              .toLocaleDateString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase();

            const hora = date.getHours().toString().padStart(2, "0");
            const minutos = date.getMinutes().toString().padStart(2, "0");

            return `${fecha} • ${hora}:${minutos} HS`;
          })()}
        </Texto>
      </View>
    </View>
  );
}

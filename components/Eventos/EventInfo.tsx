import { Texto } from "@/components/Texto";
import { abrirEnMaps } from "@/utils/abrirMaps";
import { Ionicons } from "@expo/vector-icons";

import { EventoDto } from "@/api/dto/evento.dto";
import { Image, TouchableOpacity, View } from "react-native";
import defaultEvent from "../../assets/images/defaultEvent.jpg";
import { SeguiryFavorito } from "./SeguirYFavorito";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
  onSelect: () => void;
};

export function EventInfo({ evento, productoraId, onSelect }: Props) {
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

      <SeguiryFavorito evento={evento} productoraId={productoraId} />

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
        <TouchableOpacity onPress={onSelect}>
          <Texto semiBold className="text-[#20347F] text-lg mt-2">
            Organizado por {evento.productora.nombre}
          </Texto>
        </TouchableOpacity>
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

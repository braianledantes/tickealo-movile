import { EventoDto } from "@/api/dto/evento.dto";
import { Texto } from "@/components/Texto";
import { abrirEnMaps } from "@/utils/abrirMaps";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import defaultEvent from "../../assets/images/defaultEvent.jpg";
import { FavoriteButton } from "../Button/FavoriteButton";
import { ReminderButton } from "../Button/ReminderButton";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";

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
      <View>
        <Image
          source={banner}
          className={`w-full relative ${evento.bannerUrl ? "aspect-[11/4]" : "h-44"} ${!evento.bannerUrl ? "opacity-80" : ""}`}
          resizeMode="cover"
        />
        <View className="absolute -bottom-7  right-2 flex-row">
          <ReminderButton evento={evento} />
          <FavoriteButton evento={evento} />
        </View>
      </View>

      {/* Descripción */}
      <View className="px-4 mt-4 gap-2">
        <Texto className="text-[#cfe3ff] text-2xl font-bold mb-1 tracking-wide">
          {evento.nombre}
        </Texto>
        <TouchableOpacity
          className="flex-row justify-start items-center mb-2"
          onPress={() =>
            abrirEnMaps(evento?.lugar?.latitud, evento?.lugar?.longitud)
          }
        >
          <Ionicons
            name="location-outline"
            size={18}
            color="#4da6ff"
            className="mr-1.5 "
          />
          <Texto semiBold className="text-[#4da6ff] text-md">
            {evento.lugar?.direccion
              ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
              : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
          </Texto>
        </TouchableOpacity>
        <Texto className="text-[#ddd] text-md leading-5">
          {evento.descripcion}
        </Texto>
        <TouchableOpacity
          onPress={onSelect}
          className="flex-row items-center mt-2"
        >
          <UsuarioPerfil
            imagenPerfilUrl={evento.productora.imagenUrl}
            username={evento.productora.nombre}
            icono="w-7 h-7"
            className="p-0"
          />
          <Texto semiBold className="text-[#20347F] text-lg ml-2 text-center">
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

import { EventoDto } from "@/api/dto/evento.dto";
import { Texto } from "@/components/Texto";
import { abrirEnMaps } from "@/utils/abrirMaps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { FavoriteButton } from "../Button/FavoriteButton";
import { IconButton } from "../Button/IconButton";
import { ReminderButton } from "../Button/ReminderButton";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";

type Props = {
  evento: EventoDto;
};

export function EventInfo({ evento }: Props) {
  const router = useRouter();
  return (
    <View>
      {/* Descripción */}
      <View className="px-4 mt-4 gap-2">
        <View className="flex-row justify-between items-center">
          <Texto className="text-[#cfe3ff] text-2xl font-bold tracking-wide">
            {evento.nombre}
          </Texto>
          <View className="flex-row">
            <ReminderButton evento={evento} />
            <FavoriteButton evento={evento} />
          </View>
        </View>
        <TouchableOpacity
          className="flex-row justify-start items-center mb-2"
          onPress={() =>
            abrirEnMaps(evento?.lugar?.latitud, evento?.lugar?.longitud)
          }
        >
          <Ionicons
            name="location-outline"
            size={14}
            color="#4da6ff"
            className="mr-1.5 "
          />
          <Texto semiBold className="text-[#4da6ff] text-sm">
            {evento.lugar?.direccion
              ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
              : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
          </Texto>
        </TouchableOpacity>
        <Texto className="text-[#ddd] text-md leading-5">
          {evento.descripcion}
        </Texto>
        <TouchableOpacity
          className="flex-row justify-between items-center mt-2 bg-[#0c0f2b] p-2 rounded-full"
          onPress={() =>
            router.push({
              pathname: "/(app)/info-productora",
              params: { productoraId: String(evento.productora.userId) },
            })
          }
        >
          <View className="flex-row">
            <UsuarioPerfil
              imagenPerfilUrl={evento.productora.imagenUrl}
              username={evento.productora.nombre}
              icono="w-7 h-7"
              className="p-0"
            />
            <Texto semiBold className="text-[#20347F] text-lg ml-2 text-center">
              Organizado por {evento.productora.nombre}
            </Texto>
          </View>
          <IconButton
            iconType="Feather"
            iconName="chevron-right"
            size={20}
            color="#20347F"
            style={{
              padding: 0,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Fecha */}
      <View className="mt-6 px-4 pt-3 border-t border-t-[#1b1b40]">
        <Texto className="text-[#A5A6AD] font-bold text-lg uppercase tracking-wider">
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

import { EventoDto } from "@/api/dto/evento.dto";
import { FilterButton, FiltroItem } from "@/components/Button/FilterButton";
import { FollowButton } from "@/components/Button/FollowButton";
import { EventSection } from "@/components/Eventos/EventSection";
import { UsuarioPerfil } from "@/components/Layout/UsuarioPerfil";
import { Texto } from "@/components/Texto";
import { useProductora } from "@/hooks/context/useProductora";
import { Feather, Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

type Filtro = "PROXIMOS" | "FINALIZADOS";

export default function Profile() {
  const { productoraId } = useLocalSearchParams<{ productoraId: string }>();
  const {
    getEventosFinalizadosByProductora,
    getEventosProximosByProductora,
    loadingFin,
    loadingProx,
    getProductora,
    productora,
  } = useProductora();

  const [eventosProximos, setEventosProximos] = useState<EventoDto[]>([]);
  const [eventosFinalizados, setEventosFinalizados] = useState<EventoDto[]>([]);
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("PROXIMOS");

  useEffect(() => {
    if (!productoraId) return;

    const fetchEventos = async () => {
      await getProductora(Number(productoraId));
      const proximos = await getEventosProximosByProductora(
        Number(productoraId),
      );
      const finalizados = await getEventosFinalizadosByProductora(
        Number(productoraId),
      );

      setEventosProximos(proximos || []);
      setEventosFinalizados(finalizados || []);
    };

    fetchEventos();
    // eslint-disable-next-line
  }, [productoraId]);

  const options: FiltroItem[] = useMemo(() => {
    const f: FiltroItem[] = [
      {
        key: "PROXIMOS",
        label: "Eventos Proximos",
        count: eventosProximos.length,
      },
      {
        key: "FINALIZADOS",
        label: "Eventos Finalizados",
        count: eventosFinalizados.length,
      },
    ];
    return f.filter((f) => f.count > 0);
  }, [eventosFinalizados, eventosProximos]);

  useEffect(() => {
    if (options.length && !options.find((o) => o.key === filtroActivo)) {
      setFiltroActivo(options[0].key as Filtro);
    }
    // eslint-disable-next-line
  }, [options]);

  // Loading para eventos PROXIMOS
  if (loadingProx && filtroActivo === "PROXIMOS") {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  // Loading para eventos FINALIZADOS
  if (loadingFin && filtroActivo === "FINALIZADOS") {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="bg-[#05081b]">
        {/* Avatar */}
        <View className="flex-row justify-center px-4">
          <UsuarioPerfil
            username={productora?.user.username}
            imagenPerfilUrl={productora?.imagenUrl}
            icono="w-28 h-28"
            disabled={true}
          />
          <View className="ml-5 justify-center">
            <Texto className="text-white text-3xl font-bold tracking-wide mr-4">
              {productora?.nombre}
            </Texto>
            <Texto semiBold className="text-md text-white/70 tracking-wider">
              @{productora?.user.username}
            </Texto>
            <View className="flex-row justify-start gap-2">
              <View className="flex-row justify-center p-1 mt-1 border-2 border-blue-800 text-center text-white rounded-full">
                <Texto bold className="text-blue-800 mr-2 text-xs">
                  ORGANIZADOR
                </Texto>
                <Entypo name="check" size={10} color="#1E40AF" />
              </View>
            </View>
          </View>
        </View>

        {/* Estadísticas */}
        <View className="flex-row justify-center px-4">
          <View className="items-center">
            <Texto className="text-white text-3xl font-bold tracking-wide">
              {eventosFinalizados.length + eventosProximos.length}
            </Texto>
            <Texto semiBold className="text-md text-white tracking-wider">
              eventos
            </Texto>
          </View>
          <View className="items-center mx-5">
            <Texto className="text-white text-3xl font-bold tracking-wide">
              {productora?.cantSeguidores}
            </Texto>
            <Texto semiBold className="text-md text-white tracking-wider">
              seguidores
            </Texto>
          </View>
          <View className="items-center">
            <Texto className="text-white text-3xl font-bold tracking-wide">
              {productora?.calificacion?.toFixed(1)}
            </Texto>
            <Texto semiBold className="text-md text-white tracking-wider">
              calificacion
            </Texto>
          </View>
        </View>

        {/* Contacto */}
        <View className="flex-row justify-center my-2 mb-4 px-4">
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={14} color="#999" />
            <Texto className="text-white/70 ml-1.5">
              {productora?.user.email}
            </Texto>
          </View>
          <View className="flex-row items-center ml-2">
            <Feather name="map-pin" size={12} color="#999" />
            <Texto className="text-white/70 ml-1">{productora?.pais}</Texto>
          </View>
        </View>

        <View className="flex-row justify-center items-center p-4">
          {productora ? (
            <FollowButton productora={productora} />
          ) : (
            <View className="h-10 flex-1 bg-gray-800 rounded" />
          )}
        </View>

        {/* Filtros */}
        <View className="px-4">
          <FilterButton
            filtros={options}
            filtroActivo={filtroActivo}
            setFiltroActivo={(key) => setFiltroActivo(key as Filtro)}
          />
        </View>

        {/* Contenido según filtro */}
        {filtroActivo === "PROXIMOS" && (
          <EventSection title="EVENTOS PROXIMOS" eventos={eventosProximos} />
        )}
        {filtroActivo === "FINALIZADOS" && (
          <EventSection
            title="EVENTOS FINALIZADOS"
            eventos={eventosFinalizados}
          />
        )}
      </ScrollView>
    </View>
  );
}

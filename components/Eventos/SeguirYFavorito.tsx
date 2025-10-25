import { EventoDto } from "@/api/dto/evento.dto";
import { useFavorito } from "@/hooks/context/useFavoritos";
import { useToast } from "@/hooks/context/useToast";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FollowButton } from "../Button/FollowButton";
import { IconButton } from "../Button/IconButton";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
  view?: boolean;
};

export function SeguiryFavorito({ evento, productoraId, view = true }: Props) {
  const { showToast } = useToast();
  const {
    agregarFavorito,
    eliminarFavorito,
    loading: loadingFavorito,
    error: errorFavorito,
  } = useFavorito();

  const [esFavorito, setFavorito] = useState<boolean | null>(null);

  useEffect(() => {
    if (evento) {
      setFavorito(!!evento.esFavorito);
    }
  }, [evento]);

  if (!view) return null;

  const handleErrorToast = (error: string | null) => {
    if (error) showToast("error", "Error", error);
  };

  const toggleFavorito = async () => {
    if (!evento.id) return;
    const action = esFavorito ? eliminarFavorito : agregarFavorito;
    const success = await action(evento.id);
    if (success) {
      setFavorito(!esFavorito);
      if (!esFavorito) {
        showToast(
          "success",
          "¡Listo!",
          "Evento nuevo agregado a 'Mis favoritos'",
        );
      }
    } else {
      handleErrorToast(errorFavorito);
    }
  };

  return (
    <View className="flex-row items-center justify-between mt-3 mx-4 gap-2 min-h-[56px]">
      <FollowButton evento={evento} productoraId={productoraId} />

      {/* Botón Favorito */}
      <IconButton
        iconName={esFavorito ? "heart" : "heart-outline"}
        size={50}
        color="#BD4C4C"
        colorDisabled="#BD4C4C"
        onPress={toggleFavorito}
        disabled={loadingFavorito}
        loading={loadingFavorito}
      />
    </View>
  );
}

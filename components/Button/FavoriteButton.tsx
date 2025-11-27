import { EventoDto } from "@/api/dto/evento.dto";
import { useFavorito } from "@/hooks/context/useFavoritos";
import { useToast } from "@/hooks/context/useToast";
import { useEffect, useState } from "react";
import { IconButton } from "../Button/IconButton";

type Props = {
  evento: EventoDto;
};

export function FavoriteButton({ evento }: Props) {
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

  const handleErrorToast = (error: string | null) => {
    if (error) showToast("error", "Error", error);
  };

  const toggleFavorito = async () => {
    if (esFavorito) {
      const success = await eliminarFavorito(evento.id);
      if (success) {
        setFavorito(false);
      } else {
        handleErrorToast(errorFavorito);
      }
    } else {
      const success = await agregarFavorito(evento.id);
      if (success) {
        setFavorito(true);
      } else {
        handleErrorToast(errorFavorito);
      }
    }
  };

  return (
    <>
      <IconButton
        iconName={esFavorito ? "heart" : "heart-outline"}
        size={25}
        color="#BD4C4C"
        colorDisabled="#BD4C4C"
        onPress={toggleFavorito}
        disabled={loadingFavorito}
        loading={loadingFavorito}
      />
    </>
  );
}

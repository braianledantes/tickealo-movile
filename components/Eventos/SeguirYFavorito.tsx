import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { HeartIcon, HeartOutlinedIcon } from "@/components/Input/Icons";
import { useFavorito } from "@/hooks/useFavoritos";
import { useSeguidores } from "@/hooks/useSeguidores";
import { useEffect, useState } from "react";

import { EventoDto } from "@/api/dto/evento.dto";
import { TouchableOpacity, View } from "react-native";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
  view?: boolean;
};

export function SeguiryFavorito({ evento, productoraId, view = true }: Props) {
  const { seguir, dejarSeguir } = useSeguidores();
  const { agregarFavorito, eliminarFavorito } = useFavorito();
  const [estaSiguiendo, setEstaSiguiendo] = useState<boolean | null>(null);
  const [esFavorito, setFavorito] = useState<boolean | null>(null);

  useEffect(() => {
    if (evento && estaSiguiendo === null) {
      setEstaSiguiendo(!!evento.productora?.isSeguido);
    }
  }, [evento, estaSiguiendo]);

  useEffect(() => {
    if (evento && esFavorito === null) {
      setFavorito(!!evento.productora?.isSeguido);
    }
  }, [evento, esFavorito]);

  return (
    <View>
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

          {esFavorito === true && (
            <TouchableOpacity
              className="p-2 bg-[#1b1b40] rounded-full item-center justify-center"
              onPress={async () => {
                if (!evento.id) return;
                await agregarFavorito(evento.id);
                setFavorito(true);
              }}
            >
              <HeartOutlinedIcon />
            </TouchableOpacity>
          )}

          {esFavorito === false && (
            <TouchableOpacity
              className="p-2 bg-[#1b1b40] rounded-full item-center justify-center"
              onPress={async () => {
                if (!evento.id) return;
                await eliminarFavorito(evento.id);
                setFavorito(false);
              }}
            >
              <HeartIcon />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

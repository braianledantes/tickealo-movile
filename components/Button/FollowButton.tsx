import { EventoDto } from "@/api/dto/evento.dto";
import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { useSeguidores } from "@/hooks/useSeguidores";
import { useEffect, useState } from "react";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
};

export function FollowButton({ evento, productoraId }: Props) {
  const { seguir, dejarSeguir, loading: loadingSeguimiento } = useSeguidores();

  const [estaSiguiendo, setEstaSiguiendo] = useState<boolean | null>(null);

  useEffect(() => {
    if (evento) {
      setEstaSiguiendo(!!evento.productora?.isSeguido);
    }
  }, [evento]);

  return (
    <>
      {estaSiguiendo ? (
        <SecondaryButton
          title="Siguiendo"
          onPress={async () => {
            if (!productoraId) return;
            await dejarSeguir(productoraId);
            setEstaSiguiendo(false);
          }}
          className="flex-1"
          disabled={loadingSeguimiento}
        />
      ) : (
        <Button
          title="Seguir Productora"
          onPress={async () => {
            if (!productoraId) return;
            await seguir(productoraId);
            setEstaSiguiendo(true);
          }}
          className="flex-1"
          disabled={loadingSeguimiento}
        />
      )}
    </>
  );
}

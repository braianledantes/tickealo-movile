import { ProductoraDto } from "@/api/dto/evento.dto";
import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { useSeguidores } from "@/hooks/context/useSeguidores";
import { useEffect, useState } from "react";

type Props = {
  productora: ProductoraDto;
};

export function FollowButton({ productora }: Props) {
  const { seguir, dejarSeguir, loading: loadingSeguimiento } = useSeguidores();

  const [estaSiguiendo, setEstaSiguiendo] = useState<boolean | null>(null);

  useEffect(() => {
    if (productora) {
      setEstaSiguiendo(!!productora?.isSeguido);
    }
  }, [productora]);

  return (
    <>
      {estaSiguiendo ? (
        <SecondaryButton
          title="Siguiendo"
          onPress={async () => {
            if (!productora) return;
            await dejarSeguir(productora.userId);
            setEstaSiguiendo(false);
          }}
          className="flex-1"
          disabled={loadingSeguimiento}
        />
      ) : (
        <Button
          title="Seguir Productora"
          onPress={async () => {
            if (!productora) return;
            await seguir(productora.userId);
            setEstaSiguiendo(true);
          }}
          className="flex-1"
          disabled={loadingSeguimiento}
        />
      )}
    </>
  );
}

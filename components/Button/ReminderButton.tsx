import { EventoDto } from "@/api/dto/evento.dto";
import { useRecordatorio } from "@/hooks/context/useRecordatorios";
import { useToast } from "@/hooks/context/useToast";
import { useEffect, useState } from "react";
import { IconButton } from "../Button/IconButton";

type Props = {
  evento: EventoDto;
};

export function ReminderButton({ evento }: Props) {
  const { showToast } = useToast();
  const { ponerRecordatorio, sacarRecordatorio, loading, error } =
    useRecordatorio();

  const [tieneRecordatorio, setRecordatorio] = useState<boolean | null>(null);

  useEffect(() => {
    if (evento) {
      setRecordatorio(!!evento.tieneRecordatorio);
    }
  }, [evento]);

  const handleErrorToast = (error: string | null) => {
    if (error) showToast("error", "Error", error);
    console.error(error);
  };

  const toggleReminder = async () => {
    if (!evento.id) return;
    const action = tieneRecordatorio ? sacarRecordatorio : ponerRecordatorio;
    const success = await action(evento.id);
    if (success) {
      setRecordatorio(!tieneRecordatorio);
      if (!tieneRecordatorio) {
        showToast(
          "success",
          "¡Listo!",
          "Recordatorio agendado...Revisa tus mails!",
        );
      }
    } else {
      handleErrorToast(error);
    }
  };

  return (
    <>
      <IconButton
        iconName={
          tieneRecordatorio
            ? "notifications-outline"
            : "notifications-off-outline"
        }
        size={25}
        color="#999"
        colorDisabled="#999"
        onPress={toggleReminder}
        disabled={loading}
        loading={loading}
      />
    </>
  );
}

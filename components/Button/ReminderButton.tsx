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
    if (evento && tieneRecordatorio === null) {
      setRecordatorio(!!evento.tieneRecordatorio);
    }
    // eslint-disable-next-line
  }, [evento]);

  const handleErrorToast = (error: string | null) => {
    if (error) showToast("error", "Error", error);
  };

  const toggleReminder = async () => {
    if (!evento.id) return;
    const next = !tieneRecordatorio;
    setRecordatorio(next);
    const action = next ? ponerRecordatorio : sacarRecordatorio;
    const success = await action(evento.id);
    if (!success) {
      setRecordatorio(!next);
      handleErrorToast(error);
    } else if (next) {
      showToast("success", "¡Listo!", "Recordatorio agendado");
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
        size={35}
        color="#999"
        colorDisabled="#999"
        onPress={toggleReminder}
        disabled={loading}
        loading={loading}
      />
    </>
  );
}

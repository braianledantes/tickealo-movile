import { EventoDto } from "@/api/dto/evento.dto";
import { View } from "react-native";
import { FavoriteButton } from "../Button/FavoriteButton";
import { FollowButton } from "../Button/FollowButton";
import { ReminderButton } from "../Button/ReminderButton";

type Props = {
  evento: EventoDto;
  productoraId?: number | null;
  view?: boolean;
};

export function EventActions({ evento, productoraId, view = true }: Props) {
  if (!view) return null;

  return (
    <View className="flex-row items-center justify-between mt-3 mx-4 gap-2 min-h-[56px]">
      <FollowButton evento={evento} productoraId={productoraId} />
      <FavoriteButton evento={evento} />
      <ReminderButton evento={evento} />
    </View>
  );
}

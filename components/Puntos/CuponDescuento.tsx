import { Texto } from "@/components/Texto";
import { Check, TicketPercent } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

type Props = {
  usarPuntos: boolean;
  puntosDisponibles: number;
  onToggle: () => void;
};

export function CuponDescuento({
  usarPuntos,
  puntosDisponibles,
  onToggle,
}: Props) {
  if (puntosDisponibles < 250) return null;

  return (
    <View
      className="mx-4 mt-6 flex-row items-center justify-between bg-[#0b1030] border rounded-2xl px-4 py-3"
      style={{
        borderColor: usarPuntos ? "#38d39f" : "#1b1e5e",
      }}
    >
      {/* Ícono + Texto */}
      <View className="flex-row items-center gap-2">
        <TicketPercent size={20} color="#4da6ff" />
        <Texto bold className="text-[#cfe3ff]">
          250 pts = 25% OFF
        </Texto>
      </View>

      {/* Botón aplicar/quitar */}
      <TouchableOpacity
        onPress={onToggle}
        className={`flex-row items-center px-4 py-1.5 rounded-xl ${
          usarPuntos ? "bg-[#38d39f]" : "bg-[#4da6ff]"
        }`}
      >
        {usarPuntos && <Check size={16} color="#0b1030" />}

        <Texto
          bold
          className={usarPuntos ? "text-black ml-1" : "text-white ml-1"}
        >
          {usarPuntos ? "Quitar" : "Aplicar"}
        </Texto>
      </TouchableOpacity>
    </View>
  );
}

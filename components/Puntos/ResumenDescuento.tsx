import { Texto } from "@/components/Texto";
import { View } from "react-native";

type Props = {
  total: number;
  totalFinal: number;
};

export function ResumenDescuento({ total, totalFinal }: Props) {
  const descuento = total - totalFinal;

  return (
    <View className="px-4 mt-4 space-y-2">
      {/* Precio original */}
      <View className="flex-row justify-between">
        <Texto className="text-gray-400">Precio original</Texto>
        <Texto className="text-gray-400 line-through">
          ${total.toLocaleString("es-AR")}
        </Texto>
      </View>

      {/* Descuento */}
      <View className="flex-row justify-between">
        <Texto className="text-green-400">Descuento 25%</Texto>
        <Texto className="text-green-400 font-semibold">
          - ${descuento.toLocaleString("es-AR")}
        </Texto>
      </View>

      <View className="h-[1px] bg-[#1b1e5e] my-2" />

      {/* Total final */}
      <View className="flex-row justify-between">
        <Texto bold className="text-[#4da6ff] text-lg">
          TOTAL FINAL
        </Texto>
        <Texto bold className="text-[#4da6ff] text-lg">
          ${totalFinal.toLocaleString("es-AR")}
        </Texto>
      </View>
    </View>
  );
}

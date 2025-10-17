import { BankRow } from "@/utils/utils";
import { Text, View } from "react-native";

// Tipo de datos bancarios
export type DatosBancarios = {
  titular?: string;
  cuit?: string;
  cbu?: string;
  alias?: string;
  banco?: string;
  instrucciones?: string;
};
// Componente principal para mostrar los datos bancarios
export function CuentaBancaria({ datos }: { datos: DatosBancarios | null }) {
  if (
    !datos ||
    (!datos.titular &&
      !datos.cuit &&
      !datos.cbu &&
      !datos.alias &&
      !datos.banco &&
      !datos.instrucciones)
  ) {
    return (
      <View className="bg-[#0b1030] border border-[#1b1e5e] rounded-xl p-4">
        <Text className="text-slate-400 text-base mt-1.5">
          No hay datos bancarios cargados para esta productora.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-[#0b1030] border border-[#1b1e5e] rounded-xl p-4">
      <Text className="text-[#90e0ef] font-bold mb-2 text-sm">
        Datos para la transferencia
      </Text>

      <BankRow label="Titular" value={datos.titular} />
      <BankRow label="CUIT" value={datos.cuit} />
      <BankRow label="CBU" value={datos.cbu} />
      <BankRow label="Alias" value={datos.alias} />
      <BankRow label="Banco" value={datos.banco} />

      {datos.instrucciones && (
        <View className="mt-2">
          <Text className="text-[#90e0ef] font-bold mb-1 text-sm">
            Instrucciones
          </Text>
          <Text className="text-slate-300 text-base leading-5">
            {datos.instrucciones}
          </Text>
        </View>
      )}
    </View>
  );
}

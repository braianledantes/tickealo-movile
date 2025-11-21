import { CuentaBancariaDto, ProductoraDto } from "@/api/dto/evento.dto";
import { BankRow, CopyAll } from "@/utils/utils";
import { Text, View } from "react-native";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";
export function CuentaBancaria({
  p,
  c,
}: {
  p: ProductoraDto | null;
  c: CuentaBancariaDto | undefined;
}) {
  if (!p || !c) {
    return (
      <View className="bg-[#0b1030] border border-[#1b1e5e] rounded-xl p-4">
        <Text className="text-slate-400 text-base mt-1.5">
          No hay datos bancarios cargados para esta productora.
        </Text>
      </View>
    );
  }

  //const allText = `${c.nombreTitular}\n ${p.cuit}\n  ${c.cbu}\n ${c.alias}\n Banco ${c.nombreBanco}`;

  return (
    <View className="bg-[#0c0f2b] rounded-3xl mb-4 border border-[#1b1e5e] p-4">
      <View className="flex-row justify-between">
        <Texto bold className="text-[#cfe3ff] text-xl">
          TRANSFERENCIA A
        </Texto>
        <CopyAll text={c.cbu} />
      </View>

      <View className="flex-row items-center">
        <UsuarioPerfil
          username={p.nombre}
          imagenPerfilUrl={p.imagenUrl}
          icono="w-20 h-20"
          disabled={true}
        />
        <View className="ml-4">
          <Texto bold className="text-white tracking-wide ">
            {c.nombreTitular}
          </Texto>
          <BankRow label="CUIT" value={String(p.cuit)} />
        </View>
      </View>
      <View className="gap-2">
        <BankRow label="CBU" value={c.cbu} copiable />
        <BankRow label="Alias" value={c.alias} copiable />
        <BankRow label="Banco" value={c.nombreBanco} />
        <BankRow label="Teléfono" value={p.telefono} />
      </View>

      {c.instrucciones && (
        <View className="mt-2">
          <Text className="text-[#90e0ef] font-bold mb-1 text-sm">
            Instrucciones
          </Text>
          <Text className="text-slate-300 text-base leading-5">
            {c.instrucciones}
          </Text>
        </View>
      )}
    </View>
  );
}

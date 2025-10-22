import { CuentaBancariaDto, ProductoraDto } from "@/api/dto/evento.dto";
import { BankRow, CopyAll } from "@/utils/utils";
import { Text, View } from "react-native";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";
export function CuentaBancaria({
  p,
  c,
}: {
  p: ProductoraDto | undefined;
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

  const allText = `${c.nombreTitular}\n ${p.cuit}\n  ${c.cbu}\n ${c.alias}\n Banco ${c.nombreBanco}`;

  return (
    <View className="bg-[#0c0f2b] rounded-3xl mb-4 border border-[#1b1e5e] p-4">
      <View className="flex-row justify-between">
        <Texto bold className="text-[#cfe3ff] text-xl">
          TRANSFERENCIA A
        </Texto>
        <CopyAll text={allText} />
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
      <BankRow label="CBU" value={c.cbu} />
      <BankRow label="Alias" value={c.alias} />
      <BankRow label="Banco" value={c.nombreBanco} />

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

{
  /* <View className="my-2 border-b border-white/20 pb-5">
          <Texto bold className="text-[#cfe3ff] text-xl">
            TRANSFERENCIA A
          </Texto>

          <View className="flex-row items-center">
            <UsuarioPerfil
              username={productora?.nombre}
              imagenPerfilUrl={productora?.imagenUrl}
              icono="w-20 h-20"
              disabled={true}
            />
            <View className="ml-4">
              <Texto bold className="text-white tracking-wide ">
                {productora?.nombre}
              </Texto>
              <Texto className="text-white">CUIT: {productora?.cuit}</Texto>
              <Texto className="text-white">
                Contacto: {productora?.telefono}
              </Texto>
            </View>
            {!cuentaBancaria ? (
              <Texto className="text-white">
                No hay datos bancarios disponibles.
              </Texto>
            ) : (
              <View>
                <Texto className="text-white">
                  Banco: {cuentaBancaria.nombreBanco}
                </Texto>
                <Texto className="text-white">
                  Alias: {cuentaBancaria.alias}
                </Texto>
                <Texto className="text-white">CBU: {cuentaBancaria}</Texto>
                <Texto className="text-white">
                  Titular: {datosBancarios.titular}
                </Texto>
              </View>
            )}
          </View>
        </View> */
}

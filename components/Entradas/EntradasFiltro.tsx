import { CompraDto, TransferenciaDto } from "@/api/dto/compras.dto";
import { Filtro, META_FILTROS } from "@/utils/filtrarCompras";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FilterButton, FiltroItem } from "../Button/FilterButton";
import { Texto } from "../Texto";
import { EntradaComprada } from "./EntradaComprada";

interface EntradaFiltroProps {
  porUsar: CompraDto[];
  usados: CompraDto[];
  transferidos: TransferenciaDto[];
  onPressTicket?: (compra: CompraDto | TransferenciaDto) => void;
}

export const EntradasFiltro: React.FC<EntradaFiltroProps> = ({
  porUsar,
  usados,
  transferidos,
  onPressTicket,
}) => {
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("POR_USAR");

  useEffect(() => {
    if (porUsar.length > 0) setFiltroActivo("POR_USAR");
    else if (usados.length > 0) setFiltroActivo("YA_USADAS");
    else if (transferidos.length > 0) setFiltroActivo("TRANSFERENCIAS");
  }, [porUsar.length, usados.length, transferidos.length]);

  const filtros: FiltroItem[] = [
    { key: "POR_USAR", label: "Tickets por usar", count: porUsar.length },
    { key: "YA_USADAS", label: "Tickets ya usados", count: usados.length },
    {
      key: "TRANSFERENCIAS",
      label: "Tickets transferidos",
      count: transferidos.length,
    },
  ].filter((f) => f.count > 0);

  let EntradasFiltradas: (CompraDto | TransferenciaDto)[] = [];
  if (filtroActivo === "POR_USAR") EntradasFiltradas = porUsar;
  else if (filtroActivo === "YA_USADAS") EntradasFiltradas = usados;
  else if (filtroActivo === "TRANSFERENCIAS") EntradasFiltradas = transferidos;

  const meta = META_FILTROS[filtroActivo];

  return (
    <View className="flex-1 px-4">
      <FilterButton
        filtros={filtros}
        filtroActivo={filtroActivo}
        setFiltroActivo={(key) => setFiltroActivo(key as Filtro)}
      />

      <View style={styles.section}>
        <Texto
          bold
          style={{ color: meta.colorTexto, marginBottom: 8, letterSpacing: 1 }}
        >
          {meta.titulo}
        </Texto>

        {meta.mensaje && (
          <Texto
            style={{
              color: `${meta.colorTexto}CC`,
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            {meta.mensaje}
          </Texto>
        )}

        {EntradasFiltradas.length === 0 && (
          <Texto style={{ color: meta.colorTexto }}>
            No hay entradas para este filtro.
          </Texto>
        )}

        {EntradasFiltradas.map((item) => (
          <EntradaComprada
            key={item.id}
            compra={item}
            onPress={() => onPressTicket?.(item)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
});

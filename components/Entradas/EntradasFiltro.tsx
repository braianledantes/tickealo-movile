import { CompraDto } from "@/api/dto/compras.dto";
import {
  Filtro,
  META_FILTROS,
  obtenerComprasPorFiltro,
} from "@/utils/filtrarCompras";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FilterButton, FiltroItem } from "../Button/FilterButton";
import { Texto } from "../Texto";
import { EntradaComprada } from "./EntradaComprada";
interface EntradaFiltroProps {
  compras: CompraDto[];
  onPressCompra?: (compra: CompraDto) => void;
}

export const EntradasFiltro: React.FC<EntradaFiltroProps> = ({
  compras,
  onPressCompra,
}) => {
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("POR_USAR");

  const filtros: FiltroItem[] = [
    {
      key: "POR_USAR",
      label: "Tickets por usar",
      count: obtenerComprasPorFiltro(compras, "POR_USAR").length,
    },
    {
      key: "YA_USADAS",
      label: "Tickets ya usados",
      count: obtenerComprasPorFiltro(compras, "YA_USADAS").length,
    },
  ].filter((f) => f.count > 0);

  const comprasFiltradas = obtenerComprasPorFiltro(compras, filtroActivo);
  const meta = META_FILTROS[filtroActivo];

  return (
    <ScrollView className="flex-1 px-4">
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

        {comprasFiltradas.length === 0 && (
          <Texto style={{ color: meta.colorTexto }}>
            No hay entradas para este filtro.
          </Texto>
        )}

        {comprasFiltradas.map((compra) => (
          <EntradaComprada
            key={compra.id}
            compra={compra}
            onPress={() => onPressCompra?.(compra)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
});

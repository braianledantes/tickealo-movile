import { CompraDto, TransferenciasDto } from "@/api/dto/compras.dto";
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
  transferencias?: TransferenciasDto[];
  onPressCompra?: (compra: CompraDto | TransferenciasDto) => void;
}

export const EntradasFiltro: React.FC<EntradaFiltroProps> = ({
  compras,
  transferencias,
  onPressCompra,
}) => {
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("POR_USAR");

  // Aseguramos que transferencias sea siempre un array
  const entradasTransferidas: TransferenciasDto[] = transferencias ?? [];

  // Configuramos los filtros con sus conteos
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
    {
      key: "TRANSFERENCIAS",
      label: "Tickets transferidos",
      count: entradasTransferidas.length,
    },
  ].filter((f) => f.count > 0);

  // Filtramos entradas según filtro activo
  const EntradasFiltradas =
    filtroActivo === "TRANSFERENCIAS"
      ? entradasTransferidas
      : obtenerComprasPorFiltro(compras, filtroActivo);

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

        {/* Mostrar mensaje solo si el array realmente está vacío */}
        {(!EntradasFiltradas || EntradasFiltradas.length === 0) && (
          <Texto style={{ color: meta.colorTexto }}>
            No hay entradas para este filtro.
          </Texto>
        )}

        {EntradasFiltradas?.map((item) => (
          <EntradaComprada
            key={item.id}
            compra={item}
            onPress={() => onPressCompra?.(item)}
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

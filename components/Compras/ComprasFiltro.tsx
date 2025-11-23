import { CompraDto } from "@/api/dto/compras.dto";
import {
  Filtro,
  META_FILTROS,
  obtenerComprasPorFiltro,
} from "@/utils/filtrarCompras";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FilterButton, FiltroItem } from "../Button/FilterButton";
import { Texto } from "../Texto";
import { Compra } from "./Compra";

interface ComprasFiltroProps {
  compras: CompraDto[];
  onPressCompra?: (compra: CompraDto) => void;
}

export const ComprasFiltro: React.FC<ComprasFiltroProps> = ({
  compras,
  onPressCompra,
}) => {
  // Generamos los filtros con cantidad > 0
  const filtrosConContenido: FiltroItem[] = useMemo(() => {
    const f: FiltroItem[] = [
      {
        key: "RECIENTES",
        label: "Recientes",
        count: obtenerComprasPorFiltro(compras, "RECIENTES").length,
      },
      { key: "TODAS", label: "Todas", count: compras.length },
      {
        key: "PENDIENTES",
        label: "Pendientes",
        count: obtenerComprasPorFiltro(compras, "PENDIENTES").length,
      },
      {
        key: "ACEPTADAS",
        label: "Aceptadas",
        count: obtenerComprasPorFiltro(compras, "ACEPTADAS").length,
      },
      {
        key: "RECHAZADAS",
        label: "Rechazadas",
        count: obtenerComprasPorFiltro(compras, "RECHAZADAS").length,
      },
    ];
    return f.filter((f) => f.count > 0);
  }, [compras]);

  // Inicializamos filtroActivo en el primer filtro que tenga contenido
  const [filtroActivo, setFiltroActivo] = useState<Filtro>(
    filtrosConContenido[0]?.key as Filtro
  );

  const comprasFiltradas = obtenerComprasPorFiltro(compras, filtroActivo);
  const meta = META_FILTROS[filtroActivo];

  if (!comprasFiltradas || comprasFiltradas.length === 0) {
    // Por si no hay ningún filtro con contenido
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Texto style={{ color: "#CAF0F8" }}>No hay compras para mostrar.</Texto>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4">
      {/* Botones de filtro solo con contenido */}
      <FilterButton
        filtros={filtrosConContenido}
        filtroActivo={filtroActivo}
        setFiltroActivo={(key) => setFiltroActivo(key as Filtro)}
      />

      {/* Contenido del filtro */}
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
              color: meta.colorTexto + "CC",
              marginBottom: 12,
              lineHeight: 18,
            }}
          >
            {meta.mensaje}
          </Texto>
        )}

        {comprasFiltradas.map((compra) => (
          <Compra
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

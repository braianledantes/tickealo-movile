import { CompraDto } from "@/api/dto/compras.dto";
import { filtrarCompras, Filtro } from "@/utils/filtrarCompras";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { FilterButton, FiltroItem } from "../Button/FilterButton";
import { EntradaSection } from "./EntradaSection";

interface EntradaFiltroProps {
  compras: CompraDto[];
  onPressCompra?: (compra: CompraDto) => void;
}

export const EntradasFiltro: React.FC<EntradaFiltroProps> = ({
  compras,
  onPressCompra,
}) => {
  const [verMasReciente, setVerMasReciente] = useState(false);
  const [verMasPorUsar, setVerMasPorUsar] = useState(false);
  const [verMasYaUsadas, setVerMasYaUsadas] = useState(false);
  const [verMasRechazadas, setVerMasRechazadas] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("TODAS");

  const { compraReciente, compraRechazada, entradasPorUsar, entradasYaUsadas } =
    filtrarCompras(compras);

  const filtros: FiltroItem[] = [
    { key: "TODAS", label: "Todas", count: compras.length },
    {
      key: "RECIENTES",
      label: "Compras recientes",
      count: compraReciente.length,
    },
    {
      key: "POR_USAR",
      label: "Tickets por usar",
      count: entradasPorUsar.length,
    },
    {
      key: "YA_USADAS",
      label: "Tickets ya usados",
      count: entradasYaUsadas.length,
    },
    {
      key: "RECHAZADAS",
      label: "Compras rechazadas",
      count: compraRechazada.length,
    },
  ].filter((f) => f.count > 0);

  const secciones = [
    {
      key: "RECIENTES",
      titulo: "MIS COMPRAS RECIENTES",
      data: compraReciente,
      verMas: filtroActivo === "TODAS" ? verMasReciente : true,
      setVerMas: filtroActivo === "TODAS" ? setVerMasReciente : undefined,
    },
    {
      key: "POR_USAR",
      titulo: "TICKETS POR USAR",
      data: entradasPorUsar,
      verMas: filtroActivo === "TODAS" ? verMasPorUsar : true,
      setVerMas: filtroActivo === "TODAS" ? setVerMasPorUsar : undefined,
    },
    {
      key: "YA_USADAS",
      titulo: "TICKETS YA USADOS",
      data: entradasYaUsadas,
      verMas: filtroActivo === "TODAS" ? verMasYaUsadas : true,
      setVerMas: filtroActivo === "TODAS" ? setVerMasYaUsadas : undefined,
      used: true,
    },
    {
      key: "RECHAZADAS",
      titulo: "COMPRAS RECHAZADAS",
      data: compraRechazada,
      verMas: filtroActivo === "TODAS" ? verMasRechazadas : true,
      setVerMas: filtroActivo === "TODAS" ? setVerMasRechazadas : undefined,
      used: true,
      mensaje:
        "Tu compra fue rechazada debido a una verificación no válida. Si creés que es un error, contactá a la productora.",
      colorTexto: "#FF002E",
    },
  ];

  return (
    <ScrollView className="flex-1 px-4">
      {/* Botones de filtro */}
      <FilterButton
        filtros={filtros}
        filtroActivo={filtroActivo}
        setFiltroActivo={(key) => setFiltroActivo(key as Filtro)}
      />

      {/* Secciones */}
      {secciones
        .filter((s) => filtroActivo === "TODAS" || filtroActivo === s.key)
        .map((s) => (
          <EntradaSection
            key={s.key}
            titulo={s.titulo}
            comprasSeccion={s.data}
            verMas={s.verMas}
            setVerMas={s.setVerMas}
            used={s.used}
            mensaje={s.mensaje}
            colorTexto={s.colorTexto}
            onPressCompra={onPressCompra}
          />
        ))}
    </ScrollView>
  );
};

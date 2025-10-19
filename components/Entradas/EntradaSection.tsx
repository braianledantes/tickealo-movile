import { CompraDto } from "@/api/dto/compras.dto";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";
import { EntradaComprada } from "./EntradaComprada";

interface EntradaSectionProps {
  titulo: string;
  comprasSeccion: CompraDto[];
  verMas: boolean | null;
  setVerMas?: ((val: boolean) => void) | null;
  used?: boolean;
  mensaje?: string;
  colorTexto?: string;
  onPressCompra?: (compra: CompraDto) => void;
}

export const EntradaSection: React.FC<EntradaSectionProps> = ({
  titulo,
  comprasSeccion,
  verMas,
  setVerMas = null,
  used,
  mensaje,
  colorTexto,
  onPressCompra,
}) => {
  if (comprasSeccion.length === 0) return null;

  const comprasAMostrar = verMas ? comprasSeccion : comprasSeccion.slice(0, 3);

  return (
    <View style={styles.section}>
      <Texto
        bold
        style={{
          color: "#CAF0F8",
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        {titulo}
      </Texto>

      {mensaje && (
        <Texto
          style={{
            color: `${colorTexto}CC` || "#CAF0F8",
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          {mensaje}
        </Texto>
      )}

      {comprasAMostrar.map((compra) => (
        <EntradaComprada
          key={compra.id}
          compra={compra}
          onPress={() => onPressCompra?.(compra)}
          used={used}
        />
      ))}

      {comprasSeccion.length > 3 && setVerMas && (
        <TouchableOpacity onPress={() => setVerMas(!verMas)}>
          <Texto semiBold className="text-blue-400 text-right mr-2 mt-2">
            {verMas ? "Ver menos" : "Ver más"}
          </Texto>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
});

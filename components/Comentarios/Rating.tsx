import { Rating, RatingOut } from "@/components/Input/Icons";
import React, { useState } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

interface EstrellasProps {
  calificacion: number;
  max?: number;
  editable?: boolean; // si es editable
  onChange?: (valor: number) => void; // callback al seleccionar
  starSize?: number; // tamaño de la estrella
  starSpacing?: number; // espacio entre estrellas
}

export const Estrellas: React.FC<EstrellasProps> = ({
  calificacion,
  max = 5,
  editable = false,
  onChange,
  starSize = 14,
  starSpacing = 4,
}) => {
  const [valor, setValor] = useState(calificacion);

  const handlePress = (index: number) => {
    if (!editable) return;
    setValor(index + 1);
    if (onChange) onChange(index + 1);
  };

  const starStyle: ViewStyle = { marginRight: starSpacing };

  return (
    <View style={{ flexDirection: "row", marginTop: 8 }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < valor;
        const Star = filled ? Rating : RatingOut;

        const starElement = (
          <Star style={{ fontSize: starSize, ...starStyle }} />
        );

        if (editable) {
          return (
            <TouchableOpacity key={i} onPress={() => handlePress(i)}>
              {starElement}
            </TouchableOpacity>
          );
        } else {
          return <View key={i}>{starElement}</View>;
        }
      })}
    </View>
  );
};

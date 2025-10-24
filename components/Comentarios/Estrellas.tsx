import { Rating, RatingHalf, RatingOut } from "@/components/Input/Icons";
import React, { useState } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

interface EstrellasProps {
  calificacion: number;
  max?: number;
  editable?: boolean;
  onChange?: (valor: number) => void;
  starSize?: number;
  starSpacing?: number;
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
        let Star;

        if (i + 1 <= Math.floor(valor)) {
          // Estrella llena
          Star = Rating;
        } else if (i < valor && valor % 1 !== 0) {
          // Estrella mitad
          Star = RatingHalf;
        } else {
          // Estrella vacía
          Star = RatingOut;
        }

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

import { Rating, RatingOut } from "@/components/Input/Icons";
import React from "react";
import { View } from "react-native";

interface EstrellasProps {
  calificacion: number;
  max?: number;
}

export const Estrellas: React.FC<EstrellasProps> = ({
  calificacion,
  max = 5,
}) => {
  return (
    <View className="flex-row mt-3 gap-1">
      {Array.from({ length: calificacion }, (_, i) => (
        <Rating key={`r-${i}`} />
      ))}
      {Array.from({ length: max - calificacion }, (_, i) => (
        <RatingOut key={`ro-${i}`} />
      ))}
    </View>
  );
};

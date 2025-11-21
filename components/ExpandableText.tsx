import { Texto } from "@/components/Texto";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
  descripcion: string;
  numberOfLines?: number;
};

export function ExpandableText({ descripcion, numberOfLines = 2 }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Texto
        className="text-white/90 text-md leading-6"
        numberOfLines={expanded ? undefined : numberOfLines}
      >
        {descripcion}
      </Texto>

      {descripcion.split("\n").length > numberOfLines ||
      descripcion.length > 100 ? (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Texto className="text-white/70 mt-1">
            {expanded ? "Ver menos" : "Ver más"}
          </Texto>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

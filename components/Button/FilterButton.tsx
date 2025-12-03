import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Texto } from "../Texto";

export interface FiltroItem {
  key: string;
  label: string;
  count: number;
}

interface FiltrosProps {
  filtros: FiltroItem[];
  filtroActivo: string;
  setFiltroActivo: (key: string) => void;
}

export const FilterButton: React.FC<FiltrosProps> = ({
  filtros,
  filtroActivo,
  setFiltroActivo,
}) => {
  if (filtros.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row mb-4"
      contentContainerStyle={{ paddingVertical: 4 }}
    >
      {filtros.map((f) => (
        <TouchableOpacity
          key={f.key}
          onPress={() => setFiltroActivo(f.key)}
          className={`mr-2 px-4 rounded-3xl border items-center justify-center 
            ${
              filtroActivo === f.key
                ? "bg-[#1E90FF] border-[#1E90FF]"
                : "border-[#1E90FF]"
            }`}
          style={{
            height: 34,
          }}
        >
          <Texto
            className={filtroActivo === f.key ? "text-white" : "text-blue-400"}
            style={{ fontSize: 14 }}
          >
            {f.label}
          </Texto>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

import { Input } from "@/components/Input/Input";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Texto } from "../Texto";

interface BusquedaProps {
  onPress: () => void;
  location: string;
  search: string;
  setSearch: (value: string) => void;
  onClearLocation: () => void;
}

export const Busqueda: React.FC<BusquedaProps> = ({
  onPress,
  location,
  search,
  setSearch,
  onClearLocation,
}) => {
  return (
    <View className="bg-[#05081b] py-2 px-4">
      {/* Selector de provincia */}
      <TouchableOpacity
        className="flex-row justify-between items-center mb-3"
        onPress={onPress}
      >
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={18} color="white" />
          <Texto className="text-white text-base mx-2 font-poppins">
            {location}
          </Texto>
        </View>
        <View className="flex-row justify-between">
          <IconButton
            iconName="chevron-down"
            size={18}
            color="white"
            onPress={onPress}
          />
          {location !== "Seleccionar provincia" && (
            <TouchableOpacity
              className="flex-row justify-between items-center bg-[#0c0f2b] px-3 rounded-full"
              onPress={onClearLocation}
            >
              <Texto className="text-[#BD4C4C]">Limpiar</Texto>
              <IconButton
                iconName="close"
                size={18}
                color="#BD4C4C"
                style={{ padding: 0 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Input de búsqueda */}
      <Input
        value={search}
        onChangeValue={setSearch}
        placeholder="Buscar eventos..."
        iconName="search-outline"
        containerStyle={{ marginBottom: 10 }}
      />
    </View>
  );
};

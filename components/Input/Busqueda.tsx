import { Input } from "@/components/Input/Input";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BusquedaProps {
  onPress: () => void; // abrir modal de provincia
  location: string; // provincia actual
  search: string; // valor actual del buscador
  setSearch: (value: string) => void; // función para actualizar búsqueda
}

export const Busqueda: React.FC<BusquedaProps> = ({
  onPress,
  location,
  search,
  setSearch,
}) => {
  return (
    <View className="bg-[#05081b] py-2 px-4">
      {/* Selector de provincia */}
      <TouchableOpacity
        className="flex-row items-center mb-3"
        onPress={onPress}
      >
        <Ionicons name="location-outline" size={18} color="white" />
        <Text className="text-white text-base mx-2 font-poppins">
          {location}
        </Text>
        <Ionicons name="chevron-down" size={18} color="white" />
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

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View style={styles.container}>
      {/* Selector de provincia */}
      <TouchableOpacity style={styles.left} onPress={onPress}>
        <Ionicons name="location-outline" size={18} color="white" />
        <Text style={styles.text}>{location}</Text>
        <Ionicons name="chevron-down" size={18} color="white" />
      </TouchableOpacity>

      {/* Input de búsqueda */}
      <TextInput
        style={styles.input}
        placeholder="Buscar eventos..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010030",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
    marginRight: 4,
  },
  input: {
    backgroundColor: "#111133",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
  },
});

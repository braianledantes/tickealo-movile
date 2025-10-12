import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Selector de provincia */}
      <TouchableOpacity style={styles.left} onPress={onPress}>
        <Ionicons name="location-outline" size={18} color="white" />
        <Text style={styles.text}>{location}</Text>
        <Ionicons name="chevron-down" size={18} color="white" />
      </TouchableOpacity>

      {/* Input de búsqueda */}
      <View className="border-b border-[#1b1b40] pb-2">
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
          <Ionicons
            name="search-outline"
            size={16}
            color="#A5A6AD"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar eventos..."
            placeholderTextColor="#A5A6AD"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05081b",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
    marginRight: 4,
    fontFamily: "Poppins_400Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#080C22",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#0F1D4C",
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: "#1E40AF",
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    paddingVertical: 6,
  },
});

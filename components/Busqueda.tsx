import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BusquedaProps {
  onPress: () => void; // abrir modal o dropdown
  location: string; // provincia actual o "Selecciona provincia"
}

export const Busqueda: React.FC<BusquedaProps> = ({ onPress, location }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name="location-outline" size={18} color="white" />
        <Text style={styles.text}>{location}</Text>
      </View>
      <Ionicons name="chevron-down" size={18} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#010030",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
  },
});

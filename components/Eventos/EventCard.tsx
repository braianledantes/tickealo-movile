import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  image: string;
  title: string;
  date: string;
  location: string;
  onPress: () => void;
};

export function EventCard({ image, title, date, location, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagen del evento (lado izquierdo) */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Panel derecho con contenido y degradé */}
      <LinearGradient
        colors={["#0b1030", "#0f1a4a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.info}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#4da6ff" />
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
        </View>

        <Text style={styles.link}>Ver mas info</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#0b1030",
    borderTopRightRadius: 80,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  image: {
    width: 140, 
    height: 160,
  },
  info: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    borderTopRightRadius: 80,
    borderBottomRightRadius: 0,
  },
  title: {
    color: "#cfe3ff",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  date: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    color: "#4da6ff",
    marginLeft: 6,
    fontSize: 14,
    maxWidth: "90%",
  },
  link: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});

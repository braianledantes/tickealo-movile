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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.link}>Ver más info</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#111133",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 120,
  },

  info: {
    flex: 1,
    padding: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  date: {
    color: "#ccc",
    marginTop: 4,
  },

  location: {
    color: "#999",
    marginTop: 2,
  },

  link: {
    color: "#4da6ff",
    marginTop: 6,
    fontWeight: "bold",
  },
});

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

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
        <Texto
          bold
          className="text-[#cfe3ff] text-lg uppercase tracking-wide mb-2 mr-6 "
          numberOfLines={1}
        >
          {title}
        </Texto>

        <Texto className="text-[#ffffff] mb-2">{date}</Texto>

        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={12} color="#20347F" />
          <Texto
            semiBold
            className="color-[#20347F] ml-1 mr-2"
            numberOfLines={1}
          >
            {location}
          </Texto>
        </View>
        <Texto bold className="text-[#ffffff]">
          Ver mas info
        </Texto>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#0b1030",
    borderTopRightRadius: 50,
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
    borderTopRightRadius: 90,
    borderBottomRightRadius: 0,
  },
});

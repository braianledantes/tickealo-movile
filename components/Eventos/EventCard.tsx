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
  agotado?: boolean;
};

export function EventCard({
  image,
  title,
  date,
  location,
  agotado,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagen del evento */}
      <View style={{ position: "relative" }}>
        <Image source={{ uri: image }} style={styles.image} />

        {agotado && (
          <View style={styles.agotadoBadge}>
            <Texto bold className="text-white text-xs tracking-widest">
              AGOTADO
            </Texto>
          </View>
        )}
      </View>

      {/* Información */}
      <LinearGradient
        colors={["#0b1030", "#0f1a4a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.info}
      >
        <Texto
          bold
          className="text-[#cfe3ff] text-lg uppercase tracking-wide mb-2 mr-6"
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
          Ver mas +
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

  agotadoBadge: {
    position: "absolute",
    top: 12,
    left: -25,
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    transform: [{ rotate: "-45deg" }],
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
    pointerEvents: "none",
  },

  info: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    borderTopRightRadius: 90,
    borderBottomRightRadius: 0,
  },
});

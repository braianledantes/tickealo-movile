import { useTicket } from "@/hooks/useTicket";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tick = require("@/assets/images/tick.png");

export default function TicketScreen() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const router = useRouter();
  const { loading, valid, mensaje } = useTicket(ticketId);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (valid) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [valid, opacityAnim, scaleAnim]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <Text className="text-[#4da6ff] text-base mt-3">
          Escaneando tu ticket...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05081b]">
      <View className="flex-1 justify-center items-center px-5">
        <Text
          style={{
            fontSize: 28,
            color: valid ? "white" : "#ff6b6b",
            fontWeight: "bold",
            marginBottom: 10,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {valid ? "¡Todo listo!" : "Algo salió mal"}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: valid ? "#999" : "#ffb3b3",
            marginBottom: 50,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          {mensaje}
        </Text>

        {valid ? (
          <Animated.Image
            source={Tick}
            style={{
              width: 220,
              height: 220,
              objectFit: "contain",
              marginBottom: 80,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            }}
          />
        ) : (
          <MaterialIcons
            name="error-outline"
            size={120}
            color="#ff6b6b"
            style={{ marginBottom: 40 }}
          />
        )}

        <TouchableOpacity
          onPress={() => router.back()}
          className="px-8 py-3 rounded-full"
          style={{ backgroundColor: valid ? "#03045E" : "#ff6b6b" }}
        >
          <Text className="text-white font-bold text-base uppercase">
            {valid ? "Escanear otro QR" : "Reintentar"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

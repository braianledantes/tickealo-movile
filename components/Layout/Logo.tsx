import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
const icon = require("@/assets/images/tickealo.svg");

export function Logo() {
  return (
    <View className="justify-end items-center">
      <View className="flex-row items-start justify-center gap-2">
        <Text style={[styles.logo]}>TICKEALO</Text>
        <Image
          source={icon}
          style={{ width: 30, height: 30 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: "#fff",
    fontSize: 24,
    paddingVertical: 4,
    fontFamily: "Poppins_700Bold",
  },
});

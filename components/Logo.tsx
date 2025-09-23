import { Image } from "expo-image";
import { Text, View } from "react-native";

const icon = require("../assets/images/tickealo.svg");

export function Logo() {
  return (
    <View className="justify-end items-center">
      <View className="flex-row items-start justify-center gap-2">
        <Text className="color-white text-xl font-bold">TICKEALO</Text>
        <Image
          source={icon}
          style={{ width: 30, height: 30 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

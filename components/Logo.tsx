import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const icon = require("../assets/images/tickealo.svg");

export function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.logotipo}>
        <Text style={styles.logotipo_text}>TICKEALO</Text>
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
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logotipo: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  logotipo_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
});

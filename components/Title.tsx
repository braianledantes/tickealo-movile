import { StyleSheet, Text } from "react-native";

export type TitleProps = {
  text: string;
  style?: object;
};

export function Title({ text, style }: TitleProps) {
  return <Text style={[styles.title, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});

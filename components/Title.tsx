import { StyleSheet, Text } from "react-native";

export type TitleProps = {
  text: string;
};

export function Title({ text }: TitleProps) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});

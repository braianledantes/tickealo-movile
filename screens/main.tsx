import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({
  style,
  children,
}: {
  style?: object;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#05081b" }, style]}>
      {children}
    </SafeAreaView>
  );
}

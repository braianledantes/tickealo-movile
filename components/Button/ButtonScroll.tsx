import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";

type Props = {
  visible: boolean;
  onPress: () => void;
};

export function ButtonScroll({ visible, onPress }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: visible ? 0 : 15,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Animated.View
        pointerEvents={visible ? "auto" : "none"} // ← ÚNICO pointerEvents REAL
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        <Pressable
          onPress={onPress}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={styles.button}
        >
          <ChevronDown size={24} color="#05081b" strokeWidth={2.5} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 9999,
  },
  button: {
    backgroundColor: "#4da6ff",
    padding: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
});

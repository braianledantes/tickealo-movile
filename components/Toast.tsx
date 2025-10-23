import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { ToastContext } from "../context/ToastContext";
import { IconButton } from "./Button/IconButton";
import { Texto } from "./Texto";

export const Toast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("Toast must be used within ToastProvider");

  const { toast, hideToast } = context;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      progress.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => hideToast());
      });
    }
  }, [toast]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  if (!toast) return null;

  const borderColor = toast.type === "error" ? "#ff4d4d" : "#00ff9d";

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          borderColor,
        },
      ]}
    >
      <LinearGradient
        colors={
          toast.type === "error"
            ? ["#350D0D", "#0b1030"]
            : ["#0b1030", "#0f1a4a"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <View style={styles.circle}>
          <Animated.View style={[styles.progress, { width: progressWidth }]} />
        </View>

        <View style={styles.textContainer}>
          <Texto style={styles.title}>{toast.title}</Texto>
          <Texto style={styles.message}>{toast.message}</Texto>
        </View>

        <TouchableOpacity style={styles.closeButton}>
          <IconButton
            iconName="close"
            size={24}
            color="white"
            onPress={hideToast}
          />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 80,
    left: 10,
    right: 10,
    borderRadius: 999,
    borderWidth: 2,
    zIndex: 9999,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: "100%",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  progress: { height: "100%", backgroundColor: "white" },
  textContainer: { flex: 1 },
  title: { fontWeight: "800", color: "white", letterSpacing: 1 },
  message: { color: "white" },
  closeButton: { marginLeft: 12 },
});

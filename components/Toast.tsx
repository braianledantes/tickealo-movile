import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ToastContext } from "../context/ToastContext";

export const Toast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("Toast must be used within ToastProvider");

  const { toast, hideToast } = context;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => hideToast());
    }
  }, [toast]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  if (!toast) return null;

  return (
    <View
      style={[
        styles.toast,
        toast.type === "error" ? styles.error : styles.success,
      ]}
    >
      <View style={styles.circle}>
        <Animated.View style={[styles.progress, { width: progressWidth }]} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{toast.title}</Text>
        <Text style={styles.message}>{toast.message}</Text>
      </View>

      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    zIndex: 9999,
    elevation: 5,
  },
  error: { backgroundColor: "#f8d7da" },
  success: { backgroundColor: "#d4edda" },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  progress: { height: "100%", backgroundColor: "white" },
  textContainer: { flex: 1 },
  title: { fontWeight: "700", color: "#000" },
  message: { color: "#000" },
  closeButton: { marginLeft: 12 },
  closeText: { fontSize: 18, color: "#000" },
});

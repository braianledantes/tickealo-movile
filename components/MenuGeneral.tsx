import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export const MenuGeneral: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const slideX = useRef(new Animated.Value(-220)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideX, {
        toValue: -220,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const close = () => setVisible(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="menu" size={28} color="#90e0ef" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={close} />
        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideX }] }]}
        >
          {/* Item Inicio */}
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              close();
              router.push("/");
            }}
          >
            <Ionicons name="home-outline" style={styles.icon} />
            <Text style={styles.item}>Inicio</Text>
          </TouchableOpacity>

          {/* Item Categorías */}
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              close();
              router.push("/");
            }}
          >
            <Ionicons name="albums-outline" style={styles.icon} />
            <Text style={styles.item}>Categorías</Text>
          </TouchableOpacity>

          {/* Item Mis entradas */}
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              close();
              router.push("/");
            }}
          >
            <Ionicons name="ticket-outline" style={styles.icon} />
            <Text style={styles.item}>Mis entradas</Text>
          </TouchableOpacity>

          {/* Item Favoritos */}
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              close();
              router.push("/");
            }}
          >
            <Ionicons name="heart-outline" style={styles.icon} />
            <Text style={styles.item}>Favoritos</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menu: {
    position: "absolute",
    top: 50,
    left: 0,
    bottom: 0,
    width: 220,
    backgroundColor: "#05081b",
    padding: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  item: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    color: "#90e0ef",
  },
});

// src/components/Header.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/images/logotipo.png";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  userImage: string;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userImage }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const slideX = useRef(new Animated.Value(0)).current; // 0 cerrado, 1 abierto
  const overlayOp = useRef(new Animated.Value(0)).current; // 0 transparente, 1 visible

  const openMenu = () => {
    setMenuVisible(true);
    // Ejecutar animaciones al siguiente frame para asegurar montaje
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(slideX, {
          toValue: 1,
          duration: 240,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOp, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOp, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setMenuVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Botón hamburguesa */}
      <TouchableOpacity onPress={openMenu}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Logo en el medio */}
      <Image
        source={Logo}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />

      {/* Imagen de usuario */}
      <Image source={{ uri: userImage }} style={styles.userImage} />

      {/* Menú lateral */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        {/* Overlay animado */}
        <Animated.View style={[styles.overlay, { opacity: overlayOp }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
        </Animated.View>

        {/* Menú animado deslizándose desde la izquierda */}
        <Animated.View
          style={[
            styles.menu,
            {
              paddingTop: insets.top + 10,
              paddingBottom: insets.bottom + 10,
              transform: [
                {
                  translateX: slideX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-220, 0], // igual al ancho del menú
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.menuContent}>
            {/* Otros items del menú podrían ir aquí */}

            <View style={styles.spacer} />
            <TouchableOpacity style={styles.menuItem} onPress={logout}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#010030",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  logo: {
    color: "#4da6ff",
    fontWeight: "bold",
    fontSize: 18,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#666",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 220,
    height: "100%",
    backgroundColor: "#05081b",
    padding: 20,
  },
  menuContent: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
});

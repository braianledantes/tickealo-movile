import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UsuarioPerfil } from "./UsuarioPerfil";

export const MenuGeneral: React.FC = () => {
  const { logout, user } = useAuth();
  const [visible, setVisible] = useState(false);
  const slideX = useRef(new Animated.Value(-260)).current;
  const [activeItem, setActiveItem] = useState<string>("inicio");

  const items = [
    { key: "inicio", label: "Inicio", icon: "home-outline", route: "/" },
    {
      key: "categorias",
      label: "Categorías",
      icon: "albums-outline",
      route: "/(app)/validador/ticket/[ticketId]",
    },
    {
      key: "entradas",
      label: "Mis entradas",
      icon: "ticket-outline",
      route: "/(app)/entradas/mis-entradas" as Href,
    },
    { key: "favoritos", label: "Favoritos", icon: "heart-outline", route: "/" },
  ];

  useEffect(() => {
    if (visible) {
      Animated.timing(slideX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideX, {
        toValue: -260,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const close = () => setVisible(false);

  const handlePress = (itemKey: string, route: Href) => {
    setActiveItem(itemKey);
    close();
    router.replace(route);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={close} />

        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideX }] }]}
        >
          {/* Header Usuario */}
          <View style={styles.userHeader}>
            <UsuarioPerfil
              username={user?.user.username}
              imagenPerfilUrl={user?.imagenPerfilUrl}
              icono="w-20 h-20"
              disabled={true}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.userName}>
                {user?.user?.username || "Usuario"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  close();
                  router.push("/profile");
                }}
              >
                <Text style={styles.userProfile}>Tu perfil</Text>
              </TouchableOpacity>
            </View>

            {/* Botón cerrar */}
            <TouchableOpacity onPress={close} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Items del menú */}
          <View style={styles.itemsContainer}>
            {items.map(({ key, label, icon, route }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.itemRow,
                  activeItem === key && styles.itemActive,
                ]}
                onPress={() => handlePress(key, route as Href)}
              >
                <Ionicons name={icon as any} style={styles.icon} />
                <Text style={styles.item}>{label}</Text>
                {activeItem === key && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}

            {/* Panel Validador */}
            {user?.user?.roles?.some((r) => r.name === "validador") && (
              <View>
                {/* Panel Validador */}
                <TouchableOpacity
                  style={[
                    styles.itemRow,
                    activeItem === "panelValidador" && styles.itemActive,
                  ]}
                  onPress={() =>
                    handlePress(
                      "panelValidador",
                      "/(app)/validador/validar-entradas",
                    )
                  }
                >
                  <Ionicons name="qr-code-outline" style={styles.icon} />
                  <Text style={styles.item}>Panel Validador</Text>
                  {activeItem === "panelValidador" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>

                {/* Mi Productora */}
                <TouchableOpacity
                  style={[
                    styles.itemRow,
                    activeItem === "miProductora" && styles.itemActive,
                  ]}
                  onPress={() =>
                    handlePress(
                      "miProductora",
                      "/(app)/validador/eventos-validador",
                    )
                  }
                >
                  <AntDesign name="team" size={24} style={styles.icon} />
                  <Text style={styles.item}>Mi Productora</Text>
                  {activeItem === "miProductora" && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Logout */}
          <TouchableOpacity
            onPress={async () => {
              logout();
              router.replace("/login");
            }}
            style={styles.logoutButton}
          >
            <Ionicons name="log-out-outline" style={styles.icon} />
            <Text style={styles.item}>Cerrar sesión</Text>
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
    top: Platform.OS === "ios" ? 44 : StatusBar.currentHeight,
    bottom: 0,
    width: 260,
    backgroundColor: "#05081b",
    padding: 20,
    justifyContent: "space-between",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  userImage: { width: 50, height: 50, borderRadius: 25 },
  userPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0077B6",
    alignItems: "center",
    justifyContent: "center",
  },
  userPlaceholderText: { color: "white", fontWeight: "bold" },
  userName: { color: "white", fontSize: 16, fontWeight: "600" },
  userProfile: { color: "#ccc", fontSize: 14, marginTop: 2 },
  closeButton: { position: "absolute", right: 0 },
  itemsContainer: { flex: 1 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor:
      "linear-gradient(to bottom, #03055F, #00B4D8, #90E0EF, #CAF0F8)",
  },
  item: { color: "white", fontSize: 16, marginLeft: 10 },
  icon: { fontSize: 20, color: "white" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
  },
});

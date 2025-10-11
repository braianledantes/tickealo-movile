// src/components/MenuUsuario.tsx
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const MenuUsuario: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Botón avatar */}
      <TouchableOpacity
        onPress={() => {
          router.push("/profile");
        }}
        style={styles.avatarButton}
      >
        {user ? (
          <View style={styles.avatarCircle}>
            {user.imagenPerfilUrl ? (
              <Image
                source={user.imagenPerfilUrl}
                style={{ width: 36, height: 36, borderRadius: 18 }}
              />
            ) : (
              <Text style={styles.avatarInitial}>
                {user.user.username.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
        ) : (
          <Ionicons name="person-circle-outline" size={32} color="#90e0ef" />
        )}
      </TouchableOpacity>

      {/* Modal tipo popover */}
      {/* <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />
        <View style={styles.menu}>
          <Text style={styles.userText}>
            {user?.username || user?.email || "Usuario"}
          </Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setVisible(false);
              router.push("/profile"); //
            }}
          >
            <Ionicons name="person-outline" size={20} color="#90e0ef" />
            <Text style={styles.menuText}>Mi perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setVisible(false);
              logout();
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="red" />
            <Text style={[styles.menuText, { color: "red" }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    padding: 4,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 60, // debajo del header
    right: 15,
    backgroundColor: "#05081b",
    borderRadius: 8,
    padding: 12,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  userText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
});

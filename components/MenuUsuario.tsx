// src/components/MenuUsuario.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

interface Props {
  avatarContent: React.ReactNode;
}

export const MenuUsuario: React.FC<Props> = ({ avatarContent }) => {
  const { logout, user } = useAuth();
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Avatar botón */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        {avatarContent}
      </TouchableOpacity>

      {/* Modal menú usuario */}
      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />
        <View style={[styles.menu, { top: insets.top + 60 }]}>
          <Text style={styles.title}>{user?.username ?? "Invitado"}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}

          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              logout();
              setVisible(false);
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#ff4d4d"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.logout}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 120,
    right: 15,
    width: 200,
    backgroundColor: "#0b1030",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: "#aaa",
    marginBottom: 12,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  logout: {
    color: "#ff4d4d",
    fontSize: 16,
    fontWeight: "600",
  },
});

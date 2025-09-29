import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/images/logotipo.png";
import { useAuth } from "../context/AuthContext";
import { MenuGeneral } from "./MenuGeneral";
import { MenuUsuario } from "./MenuUsuario";

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* Botón menú general */}
      <MenuGeneral />

      {/* Logo en el medio */}
      <Image
        source={Logo}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />

      {/* Avatar / Menú usuario */}
      <MenuUsuario
        avatarContent={
          user?.image ? (
            <Image source={{ uri: user.image }} style={styles.userImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {user?.username?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          )
        }
      />
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
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#4da6ff",
  },
  avatarPlaceholder: {
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
});

import { useAuth } from "@/hooks/useAuth";
import { Image, View } from "react-native";
import Logo from "../../assets/images/logotipo.png";
import { Menu } from "./Menu";
import { UsuarioPerfil } from "./UsuarioPerfil";

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <View className="h-30 bg-[#05081b] flex-row items-center justify-between px-4">
      {/* Botón menú general */}
      <Menu />

      {/* Logo en el medio */}
      <Image
        source={Logo}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />

      {/* Avatar / Menú usuario */}
      <UsuarioPerfil
        username={user?.user.username}
        imagenPerfilUrl={user?.imagenPerfilUrl}
      />
    </View>
  );
};

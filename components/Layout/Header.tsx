import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Logo from "../../assets/images/logotipo.png";
import { MenuGeneral } from "./MenuGeneral";
import { UsuarioPerfil } from "./MenuUsuario";

export type User = {
  username: string;
};
export type Usuario = {
  imagenPerfilUrl: string;
  user: User;
};
export const Header: React.FC = () => {
  const { me } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await me();
      setUsuario(userData);
      console.log(userData);
    };
    fetchUser();
  }, [me]);

  return (
    <View className="h-30 bg-[#05081b] flex-row items-center justify-between px-4">
      {/* Botón menú general */}
      <MenuGeneral />

      {/* Logo en el medio */}
      <Image
        source={Logo}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />

      {/* Avatar / Menú usuario */}
      <UsuarioPerfil
        username={usuario?.user.username}
        imagenPerfilUrl={usuario?.imagenPerfilUrl}
      />
    </View>
  );
};

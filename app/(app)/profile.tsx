import { Button } from "@/components/Button/Button";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { UsuarioPerfil } from "@/components/Layout/MenuUsuario";
import { Texto } from "@/components/Texto";
import { useAuth } from "@/hooks/useAuth";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

type Roles = {
  name: string;
  description: string;
};
type User = {
  email: string;
  emailVerifiedAt: string | null;
  username: string;
  roles: Roles[];
};

export type Usuario = {
  apellido: string;
  imagenPerfilUrl: string | null;
  nombre: string;
  puntosAcumulados: number;
  telefono: string;
  user: User;
  userId: number;
};

export default function Profile() {
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
    <View className="flex-1">
      <HeaderBack />
      <ScrollView className="bg-[#05081b] p-5">
        {/* Avatar */}
        <View className="flex-row justify-center">
          <UsuarioPerfil
            username={usuario?.user.username}
            imagenPerfilUrl={usuario?.imagenPerfilUrl}
            icono="w-28 h-28"
            disabled={true}
          />
          <View className="ml-5 justify-center">
            <Texto bold className="text-3xl  text-white/70">
              Hola{" "}
              <Texto className="italic text-white font-bold tracking-wide">
                {usuario?.user.username}
              </Texto>{" "}
              !
            </Texto>
            <Texto className="text-white/50 mt-1 ">
              Puntos Acumulados: {usuario?.puntosAcumulados}
            </Texto>
            {usuario?.user?.roles?.some((r) => r.name === "validador") && (
              <View className="flex-row justify-center p-1 mt-2 border border-2 border-[#1ED760] text-center text-white rounded-full">
                <Texto bold className="text-[#1ED760] mr-2 ">
                  VALIDADOR
                </Texto>
                <Entypo name="check" size={15} color="#1ED760" />
              </View>
            )}
          </View>
        </View>

        <View className="mt-6">
          <Texto bold className="text-white text-xl mb-2 ml-4">
            Datos de Contacto
          </Texto>
          <View className="border border-2 border-white/20 p-6 rounded-tl-2xl rounded-tr-2xl">
            <Texto className="text-white mb-2">Correo Electronico</Texto>
            <Texto className="text-white text-xl">{usuario?.user.email}</Texto>
          </View>
          <View className="border border-2 border-white/20 p-6 rounded-bl-2xl rounded-br-2xl">
            <Texto className="text-white mb-2">Telofono</Texto>
            <Texto className="text-white text-xl">{usuario?.telefono}</Texto>
          </View>
        </View>

        <View className="mt-10">
          <Texto bold className="text-white text-xl mb-2 ml-4">
            Datos Personales
          </Texto>
          <View className="border border-2 border-white/20 p-6 rounded-tl-2xl rounded-tr-2xl">
            <View className="flex-row">
              <View className="flex-1">
                <Texto className="text-white mb-2">Nombre</Texto>
                <Texto className="text-white text-xl">{usuario?.nombre}</Texto>
              </View>
              <View className="flex-1">
                <Texto className="text-white mb-2">Apellido</Texto>
                <Texto className="text-white text-xl">
                  {usuario?.apellido}
                </Texto>
              </View>
            </View>
          </View>

          <View className="border border-2 border-white/20  p-6 rounded-bl-2xl rounded-br-2xl">
            <View className="flex-row justify-between">
              <Texto bold className="text-[#4da6ff] tracking-wide text-md mt-1">
                Cambiar contraseña
              </Texto>
              <View className="">
                <AntDesign name="right" size={24} color="#4da6ff" />
              </View>
            </View>
          </View>
        </View>
        <View className="mt-6">
          <Button title="Editar Perfil" onPress={() => console.log("hola")} />
        </View>
      </ScrollView>
    </View>
  );
}

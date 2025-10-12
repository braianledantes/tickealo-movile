import { Button } from "@/components/Button/Button";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { UsuarioPerfil } from "@/components/Layout/UsuarioPerfil";
import { Texto } from "@/components/Texto";
import { useAuth } from "@/hooks/useAuth";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View className="flex-1">
      <HeaderBack />
      <ScrollView className="bg-[#05081b] p-5">
        {/* Avatar */}
        <View className="flex-row justify-center">
          <UsuarioPerfil
            username={user?.user.username}
            imagenPerfilUrl={user?.imagenPerfilUrl}
            icono="w-28 h-28"
            disabled={true}
          />
          <View className="ml-5 justify-center">
            <Texto bold className="text-3xl  text-white/70">
              Hola{" "}
              <Texto className="italic text-white font-bold tracking-wide">
                {user?.user.username}
              </Texto>{" "}
              !
            </Texto>
            <Texto className="text-white/50 mt-1 ">
              Puntos Acumulados: {user?.puntosAcumulados}
            </Texto>
            {user?.user?.roles?.some((r) => r.name === "validador") && (
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
          <Texto
            bold
            className="text-[#cfe3ff] text-xl mb-2 ml-4 tracking-wider"
          >
            Datos de Contacto
          </Texto>
          <View className="border border-2 border-[#1b1e5e] p-6 rounded-tl-2xl rounded-tr-2xl">
            <Texto className="text-[#7a86b6] mb-2">Correo Electronico</Texto>
            <Texto className="text-white text-xl">{user?.user.email}</Texto>
          </View>
          <View className="border border-2 border-[#1b1e5e] p-6 rounded-bl-2xl rounded-br-2xl">
            <Texto className="text-[#7a86b6] mb-2">Telofono</Texto>
            <Texto className="text-white text-xl">{user?.telefono}</Texto>
          </View>
        </View>
        <View className="mt-10">
          <Texto
            bold
            className="text-[#cfe3ff] text-xl mb-2 ml-4 tracking-wider"
          >
            Datos Personales
          </Texto>
          <View className="border border-2 border-[#1b1e5e] p-6 rounded-tl-2xl rounded-tr-2xl">
            <View className="flex-row">
              <View className="flex-1">
                <Texto className="text-[#7a86b6] mb-2">Nombre</Texto>
                <Texto className="text-white text-xl">{user?.nombre}</Texto>
              </View>
              <View className="flex-1">
                <Texto className="text-[#7a86b6] mb-2">Apellido</Texto>
                <Texto className="text-white text-xl">{user?.apellido}</Texto>
              </View>
            </View>
          </View>

          <View className="border border-2 border-[#1b1e5e] bg-[#0b1030] p-6 rounded-bl-2xl rounded-br-2xl">
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
          <Button
            title="Editar Perfil"
            onPress={() => router.push("/(app)/edit-profile")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

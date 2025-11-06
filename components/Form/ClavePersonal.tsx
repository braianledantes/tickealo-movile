import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { InputDisplay } from "@/components/Input/InputDisplay";
import { Texto } from "@/components/Texto";
import { useToast } from "@/hooks/context/useToast";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export function ClavePersonal({
  onRegister,
  isLoading,
  email,
  onBack,
  format = "default",
}: {
  onRegister: (data: any) => void;
  isLoading: boolean;
  email: string;
  onBack?: () => void;
  format?: "default" | "edit";
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      showToast("error", "Error", "Las contraseñas no coinciden.");
      return;
    }
    onRegister({ password });
  };

  return (
    <View className="w-full gap-4">
      <Texto className="text-[#999] text-center">
        {format === "edit"
          ? "Al cambiar tu contraseña, se cerrará tu sesión y deberás iniciar sesión nuevamente."
          : "Al iniciar sesión entrarás con tu correo y contraseña"}
      </Texto>

      {/* Muestra el correo deshabilitado */}
      <InputDisplay value={email} placeholder="Correo electrónico" />
      <View className="h-[0.5px] bg-white/75 self-center w-2/3 my-2" />

      <Input
        type="password"
        value={password}
        onChangeValue={setPassword}
        placeholder="Contraseña"
      />
      <Input
        type="password"
        value={confirmPassword}
        onChangeValue={setConfirmPassword}
        placeholder="Confirmar contraseña"
      />

      {format === "edit" ? (
        <Button
          title="Actualizar contraseña"
          onPress={handleSubmit}
          disabled={isLoading || !password || !confirmPassword}
          className="mt-4 w-full"
        />
      ) : (
        <View className="flex-row items-center justify-between mt-4">
          {/* Flecha para volver al paso anterior */}
          <TouchableOpacity
            onPress={onBack}
            className="w-12 h-12 rounded-full justify-center items-center"
          >
            <Ionicons name="arrow-back" size={28} color="#1E90FF" />
          </TouchableOpacity>

          {/* Botón Finalizar Registro */}
          <Button
            title={isLoading ? "Registrando..." : "Finalizar Registro"}
            onPress={handleSubmit}
            disabled={isLoading}
            className="flex-1 ml-4"
          />
        </View>
      )}
    </View>
  );
}

import { getCountryByIso } from "@/api/countries";
import { Button } from "@/components/Button/Button";
import { InputNumber } from "@/components/Input/InputNumber";
import { Texto } from "@/components/Texto";
import { useToast } from "@/hooks/context/useToast";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Dropdown } from "../Button/Dropdown";

export function DatosNacionalidad({
  onBack,
  onNext,
  initialValues = {},
  loading,
  format = "default",
}: {
  onBack?: () => void;
  onNext: (data: any) => void;
  initialValues?: any;
  loading?: boolean;
  format?: "default" | "edit";
}) {
  const { showToast } = useToast();

  const [paisSeleccionado, setPaisSeleccionado] = useState(
    initialValues?.pais || "Argentina",
  );
  const [telefono, setTelefono] = useState(initialValues?.telefono || "");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [paisNombre, setPaisNombre] = useState(initialValues?.pais || "");

  // ✅ El usuario puede avanzar si hay país seleccionado y teléfono
  const canProceed = paisSeleccionado && telefono;

  // Cuando cambia el país, obtenemos el prefijo
  useEffect(() => {
    if (!paisSeleccionado) return;

    const fetchCountryData = async () => {
      try {
        const data = await getCountryByIso(paisSeleccionado);
        setPhonePrefix(data.sPhoneCode || "");
        setPaisNombre(data.name || paisSeleccionado);
      } catch (error) {
        console.error("Error cargando datos del país:", error);
        showToast("error", "Error", "No se pudieron obtener datos del país");
      }
    };

    fetchCountryData();
  }, [paisSeleccionado]);

  const handleNext = () => {
    if (!telefono || !paisSeleccionado) {
      showToast(
        "error",
        "Error",
        "Asegúrate de completar todos los datos antes de continuar",
      );
      return;
    }

    onNext({
      pais: paisSeleccionado,
      telefono,
    });
  };

  return (
    <View className="w-full gap-4">
      <Texto className="text-white mb-3 text-center">
        ¡No te pierdas de nada!{"\n"}Elegí tu país y descubre los eventos cerca
        de vos.
      </Texto>

      <Dropdown
        placeholder="País"
        value={paisSeleccionado}
        onChange={(val) => setPaisSeleccionado(val)}
      />

      <InputNumber
        prefix={phonePrefix}
        value={
          telefono.startsWith(phonePrefix)
            ? telefono.replace(phonePrefix, "")
            : telefono
        }
        onChangeValue={(val) => {
          // Mandamos al estado el valor completo incluyendo el prefijo si aplica
          const finalValue = phonePrefix ? phonePrefix + val : val;
          setTelefono(finalValue);
        }}
        placeholder="Teléfono"
      />

      {format === "edit" ? (
        <Button
          onPress={handleNext}
          disabled={loading}
          title={loading ? "Actualizando..." : "Actualizar Cambios"}
          className="mt-4 w-full"
        />
      ) : (
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity onPress={onBack}>
            <Ionicons
              name="arrow-back"
              size={40}
              color="#1E90FF"
              style={{ opacity: 1 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={!canProceed}>
            <Ionicons
              name="arrow-forward"
              size={40}
              color="#1E90FF"
              style={{ opacity: canProceed ? 1 : 0.4 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useValidarEntradas } from "@/hooks/useValidarEntradas";
import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ValidarEntradas() {
  const {
    scanned,
    setScanned,
    manualCode,
    setManualCode,
    isFocused,
    setIsFocused,
    handleBarCodeScanned,
    handleManualValidation,
  } = useValidarEntradas();

  return (
    <View className="flex-1 bg-[#05081b] p-4">
      <HeaderBack />
      <Text className="text-white text-[22px] font-bold text-center my-3">
        Escanear Entrada
      </Text>

      <View className="flex-1 rounded-xl overflow-hidden border-2 border-[#00b4d8] my-3">
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={
            scanned ? undefined : (e) => handleBarCodeScanned(e.data)
          }
        />
      </View>

      <View className="mt-5 items-center w-full">
        <Text className="text-white mb-2">¿El QR no funciona?</Text>

        <View
          className={`flex-row items-center bg-[#080C22] px-4 py-2 rounded-full border-[3px] border-[#0F1D4C] mb-2 w-full ${
            isFocused ? "border-blue-900 border-2" : ""
          }`}
        >
          <Ionicons
            name="qr-code-outline"
            size={20}
            color="#A5A6AD"
            className="mr-2"
          />
          <TextInput
            className="flex-1 text-white text-base py-1 font-normal"
            placeholder="Ingresar código alfanumérico"
            placeholderTextColor="#A5A6AD"
            value={manualCode}
            onChangeText={setManualCode}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <TouchableOpacity
          onPress={handleManualValidation}
          className="bg-[#00b4d8] px-4 py-2 rounded-md mt-3"
        >
          <Text className="text-white font-bold">Validar manualmente</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setScanned(false)}>
        <Text className="text-white mt-2 text-center">Volver a escanear</Text>
      </TouchableOpacity>
    </View>
  );
}

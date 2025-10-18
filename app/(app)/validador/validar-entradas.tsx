import { SecondaryButton } from "@/components/Button/SecondaryButton"; // <-- Importar tu botón
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useValidarEntradas } from "@/hooks/useValidarEntradas";
import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ValidarEntradas() {
  const {
    scanned,
    manualCode,
    setManualCode,
    isFocused,
    setIsFocused,
    handleBarCodeScanned,
    handleManualValidation,
  } = useValidarEntradas();

  const screenHeight = Dimensions.get("window").height;
  const animatedHeight = useRef(new Animated.Value(screenHeight * 0.6)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isFocused ? screenHeight * 0.3 : screenHeight * 0.6,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "#05081b" }}>
      <HeaderBack />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        enableOnAndroid
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-white text-[22px] font-bold text-center my-3">
          Escanear Entrada
        </Text>

        {/* Cámara con animación de altura */}
        <Animated.View
          className="rounded-xl overflow-hidden border-2 border-[#00b4d8] my-3"
          style={{ height: animatedHeight }}
        >
          <CameraView
            style={{ flex: 1 }}
            onBarcodeScanned={
              scanned ? undefined : (e) => handleBarCodeScanned(e.data)
            }
          />
        </Animated.View>

        {/* Input */}
        <View className="mt-5 items-center mb-5 w-full">
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
              placeholder="¿El QR no funciona? Ingresar código alfanumérico"
              placeholderTextColor="#A5A6AD"
              value={manualCode}
              onChangeText={setManualCode}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="done"
            />
          </View>

          {/* Botón SecondaryButton */}
          <SecondaryButton
            title="Validar manualmente"
            onPress={handleManualValidation}
            className="mt-3 mb-14 w-full"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

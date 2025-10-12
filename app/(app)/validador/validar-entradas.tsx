import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ValidarEntradas() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const handleBarCodeScanned = (code: string) => {
    if (scanned) return;
    setScanned(true);

    console.log("Código escaneado:", code);
    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: code },
    });
  };

  const handleManualValidation = () => {
    if (!manualCode.trim()) {
      Alert.alert("Campo vacío", "Por favor ingresa un código válido.");
      return;
    }
    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: manualCode.trim() },
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack />
      <Text style={styles.title}>Escanear Entrada</Text>

      <View style={styles.cameraBox}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={
            scanned ? undefined : (e) => handleBarCodeScanned(e.data)
          }
        />
      </View>

      <View style={styles.manualContainer}>
        <Text style={styles.manualLabel}>¿El QR no funciona?</Text>

        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
          <Ionicons
            name="qr-code-outline"
            size={20}
            color="#A5A6AD"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
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
          style={styles.manualBtn}
        >
          <Text style={styles.manualBtnText}>Validar manualmente</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setScanned(false)}>
        <Text style={{ color: "white", marginTop: 10, textAlign: "center" }}>
          Volver a escanear
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05081b", padding: 16 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 12,
  },
  cameraBox: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#00b4d8",
    marginVertical: 12,
  },
  manualContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  manualLabel: { color: "#fff", marginBottom: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#080C22",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#0F1D4C",
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
    width: "100%",
  },
  inputFocused: {
    borderColor: "#1E40AF",
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
  },
  manualBtn: {
    backgroundColor: "#00b4d8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  manualBtnText: { color: "#fff", fontWeight: "700" },
});

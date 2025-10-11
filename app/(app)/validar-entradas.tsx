import { HeaderBack } from "@/components/Layout/HeaderBack";
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
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const handleBarCodeScanned = (code: string) => {
    if (scanned) return;
    setScanned(true);

    console.log("Código escaneado:", code);
    router.push(`/validador/ticket/${encodeURIComponent(code)}`);
  };

  const handleManualValidation = () => {
    if (!manualCode.trim()) {
      Alert.alert("Campo vacío", "Por favor ingresa un código válido.");
      return;
    }
    router.push(`/validador/ticket/${manualCode.trim()}`);
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
        <TextInput
          style={styles.input}
          placeholder="Ingresar código alfanumérico"
          placeholderTextColor="#888"
          value={manualCode}
          onChangeText={setManualCode}
        />
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
  },
  manualLabel: { color: "#fff", marginBottom: 8 },
  input: {
    backgroundColor: "#0b1030",
    borderColor: "#1b1e5e",
    borderWidth: 1,
    borderRadius: 10,
    color: "#fff",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  manualBtn: {
    backgroundColor: "#00b4d8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  manualBtnText: { color: "#fff", fontWeight: "700" },
});

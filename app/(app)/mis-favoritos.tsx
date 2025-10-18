import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisEntradas() {
  const [loading, setLoading] = useState(true);
  const favoritos = [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-[#05081b]">
      <Header />

      {favoritos.length === 0 ? (
        <View className="flex flex-1 justify-center items-center mx-20">
          <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
            Aquí estará tus eventos favoritos... cuando agregues una!
          </Texto>
        </View>
      ) : (
        <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
          Aquí aparecerán tus eventos favoritos
        </Texto>
      )}
    </SafeAreaView>
  );
}

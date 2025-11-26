import Logo from "@/assets/images/logotipo.png";
import { UsuarioPerfil } from "@/components/Layout/UsuarioPerfil";
import { useAuth } from "@/hooks/context/useAuth";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout, user } = useAuth();

  const isValidador = user?.user?.roles?.some((r) => r.name === "validador");
  const currentRoute = props.state.routeNames[props.state.index];

  const items = [
    { key: "index", label: "Inicio", icon: "home-outline", route: "/" },
    {
      key: "mis-compras",
      label: "Mis compras",
      icon: "bag-handle-outline",
      route: "/mis-compras",
    },
    {
      key: "mis-tickets",
      label: "Mis tickets",
      icon: "ticket-outline",
      route: "/mis-tickets",
    },
    {
      key: "mis-favoritos",
      label: "Favoritos",
      icon: "heart-outline",
      route: "/mis-favoritos",
    },
  ];

  const itemsValidador = [
    {
      key: "mi-productora",
      label: "Mi Productora",
      icon: "people-outline",
      route: "/mi-productora",
    },
    {
      key: "validar-entrada",
      label: "Validar Entrada",
      icon: "qr-code-outline",
      route: "/validador/validar-entrada",
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      style={styles.drawer}
    >
      {/* Header Usuario */}
      <View className="flex-row items-center mb-4 relative border-b border-white/20 pb-4">
        <UsuarioPerfil
          username={user?.user.username}
          imagenPerfilUrl={user?.imagenPerfilUrl}
          icono="w-20 h-20"
          disabled={true}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>
            {user?.user?.username || "Usuario"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/perfil");
            }}
          >
            <Text style={styles.userProfile}>Tu perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Items del menú */}
      <View style={styles.itemsContainer}>
        {items.map(({ key, label, icon, route }) => {
          const isActive = currentRoute === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.itemRow, isActive && styles.itemActive]}
              onPress={() => router.replace(route as any)}
            >
              <Ionicons name={icon as any} style={styles.icon} />
              <Text style={styles.item}>{label}</Text>
              {isActive && (
                <LinearGradient
                  colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradientBar}
                />
              )}
            </TouchableOpacity>
          );
        })}

        {/* Panel Validador */}
        {isValidador && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginVertical: 15,
              }}
            />
            {itemsValidador.map(({ key, label, icon, route }) => {
              const isActive = currentRoute === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.itemRow, isActive && styles.itemActive]}
                  onPress={() => router.push(route as any)}
                >
                  <Ionicons name={icon as any} style={styles.icon} />
                  <Text style={styles.item}>{label}</Text>
                  {isActive && (
                    <LinearGradient
                      colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={styles.gradientBar}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={async () => {
          logout();
          router.replace("/login");
        }}
        className="flex-row items-center ml-7 mt-4 py-5"
      >
        <Ionicons name="log-out-outline" style={styles.icon} />
        <Text style={styles.item}>Cerrar sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: { backgroundColor: "#05081b", borderWidth: 0 },
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#05081b",
          width: 260,
        },
        headerRight: () => (
          <UsuarioPerfil
            className="p-4"
            icono="size-8"
            username={user?.user.username}
            imagenPerfilUrl={user?.imagenPerfilUrl}
          />
        ),
        headerTitle: () => (
          <Image
            source={Logo}
            style={{ width: 100, height: 40 }}
            contentFit="contain"
          />
        ),
        headerTitleAlign: "center",
      }}
    />
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#05081b",
  },
  drawerContent: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  userName: { color: "white", fontSize: 16, fontWeight: "600" },
  userProfile: { color: "#ccc", fontSize: 14, marginTop: 2 },
  itemsContainer: { flex: 1 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },
  itemActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  item: { color: "white", fontSize: 16, marginLeft: 10 },
  icon: { fontSize: 20, color: "white" },
  gradientBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});

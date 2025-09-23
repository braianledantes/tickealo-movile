import { Text } from "react-native";

import { currentUser } from "@/api/auth";
import { Screen } from "@/screens/main";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Index() {
  const { logout } = useAuth();

  useEffect(() => {
    currentUser()
      .then((response) => {
        console.log("Admin response:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching admin data:");
      });
  }, []);

  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ color: "white", fontSize: 18, marginBottom: 20 }}
        onPress={() => {
          // The `app/(app)/_layout.tsx` redirects to the sign-in screen.
          logout();
        }}
      >
        Sign Out
      </Text>
    </Screen>
  );
}

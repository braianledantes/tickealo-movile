import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <AuthProvider />");
  }

  return value;
}

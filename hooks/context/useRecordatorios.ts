import { RecordatoriosContext } from "@/context/RecordatoriosContext";
import { useContext } from "react";

export function useRecordatorio() {
  const value = useContext(RecordatoriosContext);
  if (!value) {
    throw new Error(
      "useRecordatorios must be wrapped in a <RecordatoriosProvider />",
    );
  }

  return value;
}

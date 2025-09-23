import { cn } from "@/utils/cn";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className={cn("flex-1 bg-[#05081b]", className)}>
      {children}
    </SafeAreaView>
  );
}

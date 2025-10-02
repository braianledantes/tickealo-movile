import { Texto } from "@/components/Texto";
import { cn } from "@/utils/cn";
import { Pressable } from "react-native";

export function LinkButton({
  className,
  text,
  onPress,
}: {
  className?: string;
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable className={cn(className)} onPress={onPress}>
      <Texto medium className="color-[#1E90FF]">{text}</Texto>
    </Pressable>
  );
}

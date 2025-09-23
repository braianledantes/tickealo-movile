import { cn } from "@/utils/cn";
import { Pressable, Text } from "react-native";

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
      <Text className="color-[#1E90FF]">{text}</Text>
    </Pressable>
  );
}

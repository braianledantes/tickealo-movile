import { cn } from "@/utils/cn";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, Text } from "react-native";

export type ButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className={cn(rest.className)}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {!disabled ? (
        <LinearGradient
          colors={["#010030", "#03045E", "#0077B6", "#CAF0F8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 16, borderRadius: 100 }}
        >
          <Text className="text-white text-base font-bold text-center">
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <Text className="text-white text-base font-bold bg-gray-600 px-4 py-4 rounded-full text-center w-full">
          {title}
        </Text>
      )}
    </Pressable>
  );
}

import { Texto } from "@/components/Texto";
import { cn } from "@/utils/cn";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";

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
      <LinearGradient
        colors={["#010030", "#03045E", "#0077B6", "#CAF0F8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 16, borderRadius: 100, alignItems: "center" }}
      >
        <Texto
          semiBold
          className="text-white tracking-wider text-base text-center"
        >
          {title}
        </Texto>

        {disabled && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 100,
            }}
          />
        )}
      </LinearGradient>
    </Pressable>
  );
}

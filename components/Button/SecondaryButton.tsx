import { Texto } from "@/components/Texto";
import { cn } from "@/utils/cn";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";

export type SecondaryButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
  ...rest
}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      {...rest}
      className={cn(rest.className)}
    >
      <LinearGradient
        colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerButton}>
          <Texto
            semiBold
            className="text-white tracking-wider text-base text-center"
          >
            {title}
          </Texto>
          {disabled && (
            <View style={styles.disabledOverlay} pointerEvents="none" />
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 100,
    padding: 3,
  },
  innerButton: {
    backgroundColor: "rgba(5, 8, 27, 0.93)",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 100,
  },
});

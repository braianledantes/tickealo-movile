import { cn } from "@/utils/cn";
import { Text, TextProps } from "react-native";

export type TitleProps = TextProps & {};

export function Title({ ...rest }: TitleProps) {
  return (
    <Text
      className={cn(
        rest.className,
        "text-4xl font-bold text-center text-white",
      )}
    >
      {rest.children}
    </Text>
  );
}

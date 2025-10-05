import { Texto } from "@/components/Texto";
import { cn } from "@/utils/cn";
import { TextProps } from "react-native";

export type TitleProps = TextProps & {};

export function Title({ ...rest }: TitleProps) {
  return (
    <Texto
      medium
      className={cn(
        rest.className,
        "text-4xl font-regular text-center text-white/90",
      )}
    >
      {rest.children}
    </Texto>
  );
}

import React from "react";
import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  thin?: boolean;
  extraLight?: boolean;
  light?: boolean;
  regular?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  bold?: boolean;
  extraBold?: boolean;
  black?: boolean;
};

export function Texto({
  thin,
  extraLight,
  light,
  regular,
  medium,
  semiBold,
  bold,
  extraBold,
  black,
  style,
  ...props
}: AppTextProps) {
  let fontFamily = "Poppins_400Regular";

  if (thin) fontFamily = "Poppins_100Thin";
  else if (extraLight) fontFamily = "Poppins_200ExtraLight";
  else if (light) fontFamily = "Poppins_300Light";
  else if (regular) fontFamily = "Poppins_400Regular";
  else if (medium) fontFamily = "Poppins_500Medium";
  else if (semiBold) fontFamily = "Poppins_600SemiBold";
  else if (bold) fontFamily = "Poppins_700Bold";
  else if (extraBold) fontFamily = "Poppins_800ExtraBold";
  else if (black) fontFamily = "Poppins_900Black";

  return <Text {...props} style={[{ fontFamily }, style]} />;
}

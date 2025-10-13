import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

export const EmailIcon = (props: any) => (
  <MaterialIcons name="alternate-email" size={24} color="black" {...props} />
);

export const KeyIcon = (props: any) => (
  <Ionicons name="key-outline" size={24} color="black" {...props} />
);

export const EyeIcon = (props: any) => (
  <Ionicons name="eye" size={24} color="#666" {...props} />
);

export const EyeOffIcon = (props: any) => (
  <Ionicons name="eye-off" size={24} color="#666" {...props} />
);

export const UserIcon = (props: any) => (
  <Feather name="user" size={24} color="black" {...props} />
);

export const PhoneIcon = (props: any) => (
  <Feather name="phone" size={24} color="black" {...props} />
);

// Estilos reutilizables para íconos
export const iconStyles = StyleSheet.create({
  iconWithBackground: {
    color: "#fff",
    backgroundColor: "#393d4e",
    padding: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  iconDefault: {
    marginRight: 8,
  },
});

// Función centralizada para renderizar íconos
export const renderIcon = (type?: string, iconName?: string, style?: any) => {
  // íconos que tienen fondo gris
  const iconsWithBackground = ["email", "password", "phone", "text"];

  switch (type) {
    case "email":
      return (
        <EmailIcon
          style={[
            iconsWithBackground.includes(type)
              ? iconStyles.iconWithBackground
              : iconStyles.iconDefault,
            style,
          ]}
        />
      );
    case "password":
      return (
        <KeyIcon
          style={[
            iconsWithBackground.includes(type)
              ? iconStyles.iconWithBackground
              : iconStyles.iconDefault,
            style,
          ]}
        />
      );
    case "phone":
      return (
        <PhoneIcon
          style={[
            iconsWithBackground.includes(type)
              ? iconStyles.iconWithBackground
              : iconStyles.iconDefault,
            style,
          ]}
        />
      );
    case "text":
      return (
        <UserIcon
          style={[
            iconsWithBackground.includes(type)
              ? iconStyles.iconWithBackground
              : iconStyles.iconDefault,
            style,
          ]}
        />
      );
    case "eye":
      return <EyeIcon style={style} />;
    case "eye-off":
      return <EyeOffIcon style={style} />;
    default:
      return iconName ? (
        <Ionicons
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={20}
          color="#A5A6AD"
          style={[iconStyles.iconDefault, style]} // <- sin fondo gris
        />
      ) : null;
  }
};

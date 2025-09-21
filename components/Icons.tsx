import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

export const EmailIcon = (props: any) => (
  <MaterialIcons name="alternate-email" size={24} color="black" {...props} />
);

export const KeyIcon = (props: any) => (
  <Ionicons name="key-outline" size={24} color="black" {...props} />
);

// export const UserIcon = (props: any) => (
//   <Ionicons name="person-outline" size={24} color="black" {...props} />
// );

export const EyeIcon = (props: any) => (
  <Ionicons name={"eye"} size={24} color="#666" {...props} />
);

export const EyeOffIcon = (props: any) => (
  <Ionicons name={"eye-off"} size={24} color="#666" {...props} />
);

export const UserIcon = (props: any) => (
  <Feather name="user" size={24} color="black" {...props} />
);

export const PhoneIcon = (props: any) => (
  <Feather name="phone" size={24} color="black" {...props} />
);

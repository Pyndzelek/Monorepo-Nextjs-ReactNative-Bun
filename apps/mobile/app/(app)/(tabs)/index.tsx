import { Colors } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, color: Colors.text }}>
        You are logged in as{" "}
        <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
          {user?.name}
        </Text>
      </Text>
    </View>
  );
}

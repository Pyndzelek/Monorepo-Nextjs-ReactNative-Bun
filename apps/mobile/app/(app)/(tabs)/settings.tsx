import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import useAuth from "@/hooks/useAuth";

export default function Settings() {
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            await signOut();
          } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user?.name || "N/A"}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email || "N/A"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session</Text>

          <Pressable
            onPress={handleSignOut}
            style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signOutText}>Sign Out</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  signOutButton: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    minHeight: 56,
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

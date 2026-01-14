import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
// 👇 Importing directly from your shared package
import { passwordSchema } from "@repo/db/validation";

export default function SchemaTestScreen() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const validatePassword = () => {
    // 1. Run the Zod validation
    const result = passwordSchema.safeParse(password);

    if (result.success) {
      setStatus({ valid: true, message: "✅ Valid Password!" });
    } else {
      const errorMsg = result.error?.message || "Invalid password";
      setStatus({ valid: false, message: `❌ ${errorMsg}` });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Monorepo Validation Test</Text>
        <Text style={styles.subtitle}>Using @repo/db/validation</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password to test..."
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setStatus(null); // Reset status on change
          }}
          autoCapitalize="none"
          // secureTextEntry // Commented out so you can see what you type while testing
        />

        <Button title="Validate Schema" onPress={validatePassword} />

        {status && (
          <View
            style={[
              styles.result,
              status.valid ? styles.success : styles.error,
            ]}
          >
            <Text style={styles.resultText}>{status.message}</Text>
          </View>
        )}

        <Text style={styles.info}>
          Expected Rules:{"\n"}• Min 8 characters{"\n"}• Max 100 characters
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  result: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  success: {
    backgroundColor: "#dcfce7",
  },
  error: {
    backgroundColor: "#fee2e2",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  info: {
    marginTop: 24,
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});

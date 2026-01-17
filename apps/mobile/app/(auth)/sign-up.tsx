import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";

export default function SignUp() {
  const router = useRouter();
  const { signUp, isLoading, errors, clearErrors } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getError = (field: "name" | "email" | "password") =>
    errors.find((e) => e.field === field)?.message;

  const globalError = errors.find((e) => !e.field)?.message;

  const handleSignUp = async () => {
    await signUp({ name, email, password });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start your journey</Text>
          {globalError && (
            <Text style={styles.errorTextGlobal}>{globalError}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, getError("name") && styles.inputError]}
              placeholder="John Doe"
              placeholderTextColor={Colors.textMuted}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.length) clearErrors();
              }}
            />
            {getError("name") && (
              <Text style={styles.errorText}>{getError("name")}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, getError("email") && styles.inputError]}
              placeholder="hello@example.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.length) clearErrors();
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {getError("email") && (
              <Text style={styles.errorText}>{getError("email")}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, getError("password") && styles.inputError]}
              placeholder="********"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.length) clearErrors();
              }}
              secureTextEntry
            />
            {getError("password") && (
              <Text style={styles.errorText}>{getError("password")}</Text>
            )}
          </View>

          <Pressable
            onPress={handleSignUp}
            style={[styles.button, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  errorTextGlobal: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  link: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});

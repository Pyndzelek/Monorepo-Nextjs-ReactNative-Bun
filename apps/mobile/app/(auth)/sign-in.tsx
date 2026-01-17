import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";

export default function SignIn() {
  const { signIn, isLoading, errors, clearErrors } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getError = (field: "email" | "password") =>
    errors.find((e) => e.field === field)?.message;

  const globalError = errors.find((e) => !e.field)?.message;

  const handleSignIn = async () => {
    await signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue
            </Text>

            {globalError && (
              <Text style={styles.errorTextGlobal}>{globalError}</Text>
            )}
          </View>

          <View style={styles.form}>
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
              {/* Field Specific Error */}
              {getError("email") && (
                <Text style={styles.errorText}>{getError("email")}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  getError("password") && styles.inputError,
                ]}
                placeholder="********"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.length) clearErrors();
                }}
                secureTextEntry
              />
              {/* Field Specific Error */}
              {getError("password") && (
                <Text style={styles.errorText}>{getError("password")}</Text>
              )}
            </View>

            <Pressable
              onPress={handleSignIn}
              style={[styles.button, isLoading && styles.buttonDisabled]}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <Text style={styles.link}>Sign Up</Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

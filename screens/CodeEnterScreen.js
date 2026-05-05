import React, { useState, useRef } from "react";
import {
  View, Text, StyleSheet, Pressable,
  TextInput, ActivityIndicator, Platform, ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

export default function CodeEnterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { verifyResetCode, requestPasswordReset } = useAuth();
  const { email = "" } = route.params || {};
  const [code, setCode] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef([]);

  const handleChange = (val, index) => {
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    // No API - auto move to next input
    if (val && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      // API: GET /auth/verify-account?token=...
      const result = await verifyResetCode({
        email,
        code: code.join(""),
      });
      if (result.ok) {
        navigation.navigate("SetNewPassword", {
          email,
          code: code.join(""),
        });
      } else {
        setError(result.error || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      // API: POST /auth/forgot-password
      await requestPasswordReset(email);
      setCode(["", "", "", ""]);
      setError("");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        <View style={styles.shapesContainer} pointerEvents="none">
          <View style={[styles.shapeLargePurple, styles.circlePurple]} />
          <View style={[styles.shapeTeal, styles.circleTeal]} />
          <View style={[styles.shapePink, styles.circlePink]} />
        </View>

        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>

        <Text style={styles.title}>Enter Code</Text>
        <Text style={styles.subtitle}>
          Enter the code we sent to your phone or email
        </Text>

        {/* No API - just typing the code */}
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={[styles.codeBox, digit && styles.codeBoxFilled]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={val => handleChange(val, index)}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* API: GET /auth/verify-account */}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed,
            isSubmitting && styles.btnDisabled,
          ]}
          onPress={handleVerify}
          disabled={isSubmitting}>
          {isSubmitting
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>Verify</Text>}
        </Pressable>

        {/* API: POST /auth/forgot-password */}
        <Pressable onPress={handleResend} style={styles.resendBtn}>
          <Text style={styles.resendText}>
            Didn't receive a code?{" "}
            <Text style={styles.resendBold}>Send Again</Text>
          </Text>
        </Pressable>

        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  shapesContainer: {
    height: 220, marginHorizontal: -24,
    marginBottom: 8, position: "relative",
  },
  shapeLargePurple: {
    position: "absolute", width: "110%", height: 400,
    borderRadius: 400, right: "-20%", top: "-30%",
  },
  circlePurple: { backgroundColor: colors.deepPurple },
  shapeTeal: {
    position: "absolute", width: 100, height: 100,
    borderRadius: 50, top: -20, left: -15,
  },
  circleTeal: { backgroundColor: colors.teal },
  shapePink: {
    position: "absolute", width: 130, height: 130,
    borderRadius: 65, bottom: -10, right: -50,
  },
  circlePink: { backgroundColor: colors.primaryPink },
  avatarWrap: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.lightLavender,
    alignSelf: "center", marginBottom: 16,
    alignItems: "center", justifyContent: "center",
    borderWidth: 3, borderColor: colors.primaryPink,
  },
  avatarEmoji: { fontSize: 40 },
  title: {
    fontSize: 24, fontWeight: "700",
    color: colors.deepPurple, textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14, color: "#6b7280",
    textAlign: "center", marginBottom: 28,
  },
  codeRow: {
    flexDirection: "row", justifyContent: "center",
    gap: 16, marginBottom: 20,
  },
  codeBox: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: colors.inputBg,
    fontSize: 24, textAlign: "center",
    color: colors.deepPurple,
    borderWidth: 2, borderColor: "transparent",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  codeBoxFilled: {
    borderColor: colors.deepPurple,
    backgroundColor: colors.lightLavender,
  },
  errorText: {
    color: "#b91c1c", fontSize: 14,
    textAlign: "center", marginBottom: 12,
  },
  btn: {
    backgroundColor: colors.primaryPink,
    borderRadius: 12, paddingVertical: 16,
    alignItems: "center", marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: colors.primaryPink, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  btnPressed: { opacity: 0.9 },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  resendBtn: { alignItems: "center", marginBottom: 12, padding: 4 },
  resendText: { fontSize: 14, color: "#6b7280" },
  resendBold: { color: colors.deepPurple, fontWeight: "700" },
  cancelBtn: { alignItems: "center", padding: 8 },
  cancelText: { fontSize: 15, color: colors.deepPurple, opacity: 0.6 },
});
import React, { useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const CODE_LENGTH = 4;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { requestPasswordReset, verifyResetCode } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, text) => {
    const digit = text.replace(/\D/g, "").slice(-1);
    const newCode = (code.slice(0, index) + digit + code.slice(index + 1)).slice(0, CODE_LENGTH);
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 10);
    }
  };

  const handleSendAgain = async () => {
    if (!email.trim()) {
      setError("Enter your email first.");
      return;
    }
    setError("");
    setIsSending(true);
    const result = await requestPasswordReset(email.trim());
    if (!result.ok) {
      setError(result.error || "Failed to send code.");
    }
    setIsSending(false);
  };

  const handleNext = async () => {
    if (!email.trim()) {
      setError("Enter your email to continue.");
      return;
    }
    if (code.length < CODE_LENGTH) {
      setError("Enter the 4-digit code.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    const result = await verifyResetCode({ email: email.trim(), code });
    if (!result.ok) {
      setError(result.error || "Invalid code.");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    navigation.navigate("SetNewPassword", { email: email.trim(), code });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.shapesContainer} pointerEvents="none">
          <View style={[styles.shapeLargePurple, styles.circlePurple]} />
          <View style={[styles.shapeTeal, styles.circleTeal]} />
          <View style={[styles.shapePink, styles.circlePink]} />
        </View>

        <Text style={styles.title}>Password Recovery</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          editable={!isSubmitting && !isSending}
        />

        <View style={styles.codeRow}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              style={styles.codeInput}
              value={code[index] ?? ""}
              onChangeText={(text) => handleChange(index, text)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.hint}>Check your email for the code</Text>

        <Pressable style={styles.sendAgainWrap} onPress={handleSendAgain} disabled={isSending}>
          <Text style={styles.sendAgainText}>
            {isSending ? "Sending..." : "Send Again"}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={isSubmitting}
        >
          <Text style={styles.nextButtonText}>{isSubmitting ? "Verifying..." : "Next"}</Text>
        </Pressable>

        <Pressable style={styles.cancelLink} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shapesContainer: {
    height: 220,
    marginHorizontal: -24,
    marginBottom: 8,
    position: "relative",
  },
  shapeLargePurple: {
    position: "absolute",
    width: "110%",
    height: 400,
    borderRadius: 400,
    right: "-20%",
    top: "-30%",
    marginLeft: -120,
    marginTop: -120,
  },
  circlePurple: {
    backgroundColor: colors.deepPurple,
  },
  shapeTeal: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -20,
    left: -15,
  },
  circleTeal: {
    backgroundColor: colors.teal,
  },
  shapePink: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    bottom: -10,
    right: -50,
  },
  circlePink: {
    backgroundColor: colors.primaryPink,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  hint: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  sendAgainWrap: {
    alignSelf: "center",
    marginBottom: 28,
  },
  sendAgainText: {
    color: "#513682",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  nextButton: {
    backgroundColor: colors.primaryPink,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryPink,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nextButtonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  cancelLink: {
    alignSelf: "center",
  },
  cancelText: {
    color: "#6b7280",
    fontSize: 15,
    fontWeight: "500",
  },
});

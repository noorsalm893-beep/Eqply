import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { colors } from "../constants/colors";

const CODE_LENGTH = 4;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (index: number, text: string) => {
    const digit = text.replace(/\D/g, "").slice(-1);
    const newCode = (code.slice(0, index) + digit + code.slice(index + 1)).slice(0, CODE_LENGTH);
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
    }
  };

  const handleKeyPress = (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 10);
    }
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

        <View style={styles.codeRow}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
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

        <Text style={styles.hint}>Check your email for the code</Text>

        <Pressable style={styles.sendAgainWrap}>
          <Text style={styles.sendAgainText}>Send Again</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
          onPress={() => router.replace("/set-new-password")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>

        <Link href="/login" asChild>
          <Pressable style={styles.cancelLink}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Link>
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
    marginBottom: 24,
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

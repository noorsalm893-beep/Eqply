import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function SetNewPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setNewPassword } = useAuth();
  const { email = "", code = "" } = route.params || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSave = async () => {
    if (!email || !code) {
      setError("Missing email or code. Please restart the reset flow.");
      return;
    }
    if (!password) {
      setError("Enter your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    const result = await setNewPassword({ email, code, password });
    if (!result.ok) {
      setError(result.error || "Failed to reset password.");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const closeModalAndGoToLogin = () => {
    setShowSuccessModal(false);
    navigation.navigate("Login");
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

        <View style={styles.avatarWrap}>
          <Image
            source={require("../assets/ava1.jpeg")}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.greeting}>Set new password</Text>
        <Text style={styles.label}>Type and confirm your new password</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          <Text style={styles.nextButtonText}>{isSubmitting ? "Saving..." : "Next"}</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={closeModalAndGoToLogin}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModalAndGoToLogin}>
          <Pressable style={styles.modalBox} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>Your new password has been saved successfully</Text>
            <Pressable
              style={({ pressed }) => [styles.modalButton, pressed && styles.modalButtonPressed]}
              onPress={closeModalAndGoToLogin}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
  avatarWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primaryPink,
    alignSelf: "center",
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.deepPurple,
    textAlign: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111",
    marginBottom: 12,
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
    marginBottom: 12,
    textAlign: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: colors.primaryPink,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  modalButtonPressed: {
    opacity: 0.85,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const AVATARS = [
  require("../assets/ava1.jpeg"),
  require("../assets/ava2.jpeg"),
  require("../assets/ava3.jpeg"),
  require("../assets/ava4.jpeg"),
];

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    setIsSubmitting(true);
    const result = await signUp({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      role,
      avatarIndex: selectedAvatar,
    });
    if (!result.ok) {
      setError(result.error || "Registration failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.sectionTitle}>Choose Account Type</Text>

     <View style={styles.roleContainer}>
       <Pressable
         style={[
         styles.roleButton,
         role === "user" && styles.roleButtonSelected,
        ]}
       onPress={() => setRole("user")}
      >
     <Text
      style={[
        styles.roleButtonText,
        role === "user" && styles.roleButtonTextSelected,
      ]}
       >
       User
       </Text>
        </Pressable>

  <Pressable
    style={[
      styles.roleButton,
      role === "vendor" && styles.roleButtonSelected,
    ]}
    onPress={() => setRole("vendor")}
  >
    <Text
      style={[
        styles.roleButtonText,
        role === "vendor" && styles.roleButtonTextSelected,
      ]}
    >
      Vendor
    </Text>
  </Pressable>
</View>

<Text style={styles.sectionTitle}>Choose Avatar</Text>


        <View style={styles.avatarRow}>
          {AVATARS.map((src, index) => (
            <Pressable
              key={index}
              style={[styles.avatarOption, selectedAvatar === index && styles.avatarOptionSelected]}
              onPress={() => setSelectedAvatar(index)}
            >
              <Image source={src} style={styles.avatarImage} resizeMode="cover" />
              {selectedAvatar === index && (
                <View style={styles.avatarCheck}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="User name"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
          editable={!isSubmitting}
        />
        <View style={styles.emailRow}>
          <TextInput
            style={[styles.input, styles.inputEmail]}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!isSubmitting}
          />
        </View>
        <View style={styles.emailRow}>
          <TextInput
            style={[styles.input, styles.inputEmail]}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            editable={!isSubmitting}
          />
          <View style={styles.eyeIcon}>
            <Ionicons name="eye-off-outline" size={20} color="#6b7280" />
          </View>
        </View>
        <View style={styles.phoneRow}>
          <TextInput
            style={[styles.input, styles.inputPhone]}
            placeholder="Your number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!isSubmitting}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isSubmitting}
        >
          <Text style={styles.nextButtonText}>{isSubmitting ? "Creating..." : "Next"}</Text>
        </Pressable>

        <Pressable style={styles.accountLink} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.accountLinkText}>I have an account</Text>
        </Pressable>
      </ScrollView>
      </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.deepPurple,
    marginBottom: 10,
  },
  
  roleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  
  roleButton: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  
  roleButtonSelected: {
    borderColor: colors.primaryPink,
    backgroundColor: "#fff",
  },
  
  roleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.deepPurple,
  },
  
  roleButtonTextSelected: {
    color: colors.primaryPink,
  },
  
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  avatarOption: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  avatarOptionSelected: {
    borderColor: colors.primaryPink,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarCheck: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: colors.primaryPink,
    borderRadius: 10,
    padding: 2,
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
  emailRow: {
    position: "relative",
  },
  inputEmail: {
    paddingRight: 44,
  },
  phoneRow: {
    marginBottom: 8,
  },
  inputPhone: {
    marginBottom: 0,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    marginBottom: 12,
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
  accountLink: {
    alignSelf: "center",
  },
  accountLinkText: {
    color: colors.deepPurple,
    fontSize: 15,
    fontWeight: "600",
  },
});

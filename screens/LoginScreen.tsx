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
import React from "react";
  
  export default function LoginScreen() {
    const { signIn } = useAuth();
    const navigation = useNavigation();
  
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
  
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Good to see you back! ❤</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
          />
  
          <Pressable
            style={styles.forgotWrap}
            onPress={() => navigation.navigate("ForgotPassword" as never)}
          >
            <Text style={styles.forgotText}>forgot password</Text>
          </Pressable>
  
          <Pressable
            style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
            onPress={signIn}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
  
          <Pressable
            style={styles.cancelLink}
            onPress={() => navigation.navigate("Welcome" as never)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
  
          <Pressable
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register" as never)}
          >
            <Text style={styles.registerLinkText}>Create account</Text>
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
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#6b7280",
      marginBottom: 24,
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
    forgotWrap: {
      alignSelf: "flex-end",
      marginBottom: 24,
    },
    forgotText: {
      color: colors.deepPurple,
      fontSize: 14,
      fontWeight: "500",
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
      marginBottom: 24,
    },
    cancelText: {
      color: "#6b7280",
      fontSize: 15,
      fontWeight: "500",
    },
    registerLink: {
      alignSelf: "center",
    },
    registerLinkText: {
      color: colors.deepPurple,
      fontSize: 15,
      fontWeight: "600",
    },
  });
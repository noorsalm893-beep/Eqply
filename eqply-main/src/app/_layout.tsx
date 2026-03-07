import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color="#2B0B75" />
      <Text style={styles.splashText}>Loading Eqply...</Text>
    </View>
  );
}

function RootNavigator() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="(tabs)" />
        </>
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="set-new-password" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EDEE",
  },
  splashText: {
    marginTop: 12,
    fontSize: 18,
    color: "#2B0B75",
    fontWeight: "600",
  },
});
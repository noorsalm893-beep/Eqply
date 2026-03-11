import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./context/AuthContext";

import IndexScreen from "./screens/IndexScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import SetNewPasswordScreen from "./screens/SetNewPasswordScreen";

type RootStackParamList = {
  Index: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  SetNewPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

  if (isLoading) return <SplashScreen />;

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="Index" component={IndexScreen} />
      ) : (
        <>
          <Stack.Screen name="Index" component={IndexScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
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
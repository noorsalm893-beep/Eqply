import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { colors } from "./constants/colors";

import IndexScreen from "./screens/IndexScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import SetNewPasswordScreen from "./screens/SetNewPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SubscriptionPlansScreen from "./screens/SubscriptionPlansScreen";
import SearchScreen from "./screens/SearchScreen";
import ExploreEquipmentScreen from "./screens/ExploreEquipmentScreen";
import BestDealsScreen from "./screens/BestDealsScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AddProductScreen from "./screens/AddProductScreen";
import AddressScreen from "./screens/AddressScreen";
import TrackingOrderScreen from "./screens/TrackingOrderScreen";
import TermsConditionsScreen from "./screens/TermsConditionsScreen";
import FilterSortScreen from "./screens/FilterSortScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color={colors.deepPurple} />
      <Text style={styles.splashText}>Loading Eqply...</Text>
    </View>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={IndexScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      <Stack.Screen name="Subscriptions" component={SubscriptionPlansScreen} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.deepPurple,
    tabBarInactiveTintColor: "#8e8e93",
    tabBarStyle: { borderTopColor: "#f0e6f0" },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = "ellipse";

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Settings") {
        iconName = focused ? "settings" : "settings-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
  );
}

function RootNavigator() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) return <SplashScreen />;

  return isSignedIn ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="Subscriptions" component={SubscriptionPlansScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ExploreEquipment" component={ExploreEquipmentScreen} />
      <Stack.Screen name="BestDeals" component={BestDealsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Tracking" component={TrackingOrderScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="FilterSort" component={FilterSortScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  ) : (
    <AuthStack />
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
    backgroundColor: colors.background,
  },
  splashText: {
    marginTop: 12,
    fontSize: 18,
    color: colors.deepPurple,
    fontWeight: "600",
  },
});

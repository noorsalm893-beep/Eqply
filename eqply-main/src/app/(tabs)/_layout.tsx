import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#64748b",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#e2e8f0",
                },
                headerStyle: {
                    backgroundColor: "#f8fafc",
                    borderBottomWidth: 1,
                    borderBottomColor: "#e2e8f0",
                },
                headerTintColor: "#0f172a",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarLabel: "Home",
                    headerTitle: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: "Register",
                    tabBarLabel: "Register",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

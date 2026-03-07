import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { useState } from "react";
import {
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { colors } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

const AVATARS = [
    require("../../../assets/images/ava1.jpeg"),
    require("../../../assets/images/ava2.jpeg"),
    require("../../../assets/images/ava3.jpeg"),
    require("../../../assets/images/ava4.jpeg"),
];

export default function RegisterScreen() {
    const { signIn } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

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

                <Text style={styles.title}>Create Account</Text>

                <View style={styles.avatarRow}>
                    {AVATARS.map((src, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.avatarOption,
                                selectedAvatar === index && styles.avatarOptionSelected,
                            ]}
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
                />
                <View style={styles.emailRow}>
                    <TextInput
                        style={[styles.input, styles.inputEmail]}
                        placeholder="Email"
                        placeholderTextColor="#9ca3af"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.emailRow}>
                    <TextInput
                        style={[styles.input, styles.inputEmail]}
                        placeholder="Password"
                        placeholderTextColor="#9ca3af"
                        keyboardType="visible-password"
                        autoCapitalize="none"
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
                    />
                </View>
                
                <Pressable
                    style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
                >
                    <Text onPress={signIn} style={styles.nextButtonText}>Next</Text>
                </Pressable>

                <Link href={"/login" as Href} asChild>
                    <Pressable style={styles.accountLink}>
                        <Text style={styles.accountLinkText}>I have an account</Text>
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
        borderRadius: "50%",
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
    avatarRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginBottom: 28,
        flexWrap: "wrap",
    },
    avatarOption: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 2,
        borderColor: colors.lightLavender,
        overflow: "hidden",
        backgroundColor: colors.inputBg,
    },
    avatarOptionSelected: {
        borderColor: colors.primaryPink,
        borderWidth: 3,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    avatarCheck: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: colors.primaryPink,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        backgroundColor: colors.inputBg,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#111",
        marginBottom: 14,
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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBg,
        borderRadius: 12,
        marginBottom: 14,
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
    inputEmail: {
        flex: 1,
        marginBottom: 0,
    },
    eyeIcon: {
        paddingRight: 14,
    },
    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBg,
        borderRadius: 12,
        marginBottom: 28,
        overflow: "hidden",
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
    countryCode: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    flag: {
        fontSize: 20,
    },
    phoneDivider: {
        width: 1,
        height: 24,
        backgroundColor: colors.lightLavender,
    },
    inputPhone: {
        flex: 1,
        marginBottom: 0,
        marginLeft: 8,
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
    accountLink: {
        alignSelf: "center",
    },
    accountLinkText: {
        color: colors.deepPurple,
        fontSize: 15,
        fontWeight: "500",
    },
});

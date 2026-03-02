import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const CIRCLE_SIZE = 420;
const CIRCLE_OFFSET = 140;

const COLORS = {
  background: "#fafaf6",
  text: "#1e3a5f",
  pink: "#ff2d98",
  teal: "#0fc1df",
};

export default function Index() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        router.replace("/welcome");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          styles.circlePink,
          {
            top: -CIRCLE_OFFSET,
            left: -CIRCLE_OFFSET,
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          styles.circleTeal,
          {
            bottom: -CIRCLE_OFFSET,
            right: -CIRCLE_OFFSET,
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
          },
        ]}
      />
      <View style={styles.textWrap}>
        <Text style={styles.logo}>EQPLY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  circle: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  circlePink: {
    backgroundColor: COLORS.pink,
  },
  circleTeal: {
    backgroundColor: COLORS.teal,
  },
  textWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 42,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 2,
  },
});

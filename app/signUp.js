import { AntDesign, Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { auth } from "../firebaseConfig";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});
const handleGoogleSignUp = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    if (!idToken) {
      throw new Error("No ID token received.");
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, googleCredential);

    router.replace("/home");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("An account already exists with this email.");
    } else {
      alert(error.message);
    }
  }
};
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account created successfully!");

      router.replace("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A3F4D",
      }}
    >
      <Text style={{ color: "white", fontSize: 40 }}>Welcome</Text>
      <View
        style={{
          marginTop: 50,
          width: "85%",
          padding: 25,
          backgroundColor: "rgba(255,255,255,0.25)",
          borderRadius: 25,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.4)",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginBottom: 25,
          }}
        >
          Sign Up
        </Text>

        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="white"
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            padding: 15,
            borderRadius: 15,
            marginBottom: 15,
          }}
        />

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            marginBottom: 15,
          }}
        >
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={!showPassword}
            style={{
              flex: 1,
              color: "white",
              paddingVertical: 15,
            }}
          />

          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="white"
            />
          </Pressable>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            marginBottom: 30,
          }}
        >
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            secureTextEntry={!showConfirmPassword}
            style={{
              flex: 1,
              color: "white",
              paddingVertical: 15,
            }}
          />

          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={22}
              color="white"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={handleSignup}
          style={{
            width: 160,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#112A46",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/")}>
          <Text
            style={{
              marginTop: 25,
              color: "white",
              fontSize: 15,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </Text>
        </Pressable>
        <Text
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            marginTop: 10,
          }}
        >
          or continue with
        </Text>
        <Pressable
          onPress={handleGoogleSignUp}
          style={{
            alignItems: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <AntDesign name="google" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

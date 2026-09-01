import { AntDesign, Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { auth } from "../firebaseConfig";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const handleGoogleLogin = async () => {
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
    alert(error.message);
  }
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset link has been sent to your email.");
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
      <Text style={{ color: "white", fontSize: 40 }}>Welcome Back</Text>
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
          Login
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

        <Pressable
          onPress={handlePasswordReset}
          style={{
            alignSelf: "flex-end",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              textDecorationLine: "underline",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable
          onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/signUp")}>
          <Text
            style={{
              marginTop: 25,
              color: "white",
              fontSize: 15,
            }}
          >
            Don&apos;t have an account?{" "}
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Sign Up
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
          onPress={handleGoogleLogin}
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

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Pressable, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1A3F4D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        Home
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginTop: 15,
        }}
      >
        Welcome!
      </Text>
      <Pressable
        onPress={handleLogout}
        style={{
          width: 150,
          height: 50,
          backgroundColor: "#112A46",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
      </Pressable>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginTop: 20,
        }}
      >
        Logged in as:
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {auth.currentUser?.email}
      </Text>
    </View>
  );
}

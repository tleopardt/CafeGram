import { View, Text, Animated, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, fullHeight, fullWidth } from "../../../styles";
import Login from "./Form/Login";
import Register from "./Form/Register";
import { socialAuthToken } from "../../../config/constant";
import { GoogleAuth } from "./SocialLogin";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth({ setAuth, setIsVote }) {
  const [login, setLogin] = useState(true);
  const height = useRef(new Animated.Value(0)).current;
  const footerHeight = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  const transition = new Animated.Value(0);

  useEffect(() => {
    animationForm();
  }, []);

  const afterAuth = (val) => {
    if (val) {
      animationSlide();

      setTimeout(async () => {
        await SecureStore.setItemAsync("auth_session", JSON.stringify(val));
        setAuth(val);
      }, 2000);
    }
  };

  const switchForm = () => {
    setLogin(!login);
  };

  const animationSlide = () => {
    Animated.timing(transition, {
      toValue: -fullWidth,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const animationForm = () => {
    Animated.timing(width, {
      toValue: fullWidth - 50,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(height, {
        toValue: 310,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(footerHeight, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 800);
  };

  return (
    <SafeAreaView>
      <Animated.View
        style={{
          transform: [{ translateX: transition }],
          width: fullWidth,
          height: fullHeight,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fcfcfc",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <Image
            source={require("../../../../assets/login.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="cover"
          />

          <Animated.View
            style={{ width: "100%", height: height, overflow: "hidden" }}
          >
            {login ? (
              <Login afterAuth={afterAuth} />
            ) : (
              <Register afterAuth={afterAuth} />
            )}
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontWeight: "600",
                paddingVertical: 20,
                textDecorationLine: "",
              }}
            >
              Or continue with
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <GoogleAuth
                clientId={socialAuthToken.google}
                onAuth={afterAuth}
                setIsVote={setIsVote}
              />
            </View>
          </Animated.View>

          <Animated.View
            style={{
              height: 0.5,
              backgroundColor: "rgba(0,0,0,0.3)",
              width: width,
              marginVertical: 20,
            }}
          />
          <Animated.Text style={{ color: "#000", height: footerHeight }}>
            {login
              ? `Don't have any existing account?`
              : "Already have an account?"}
            <Text style={{ color: colors.brandLightPink }} onPress={switchForm}>
              &nbsp;{login ? "Create a new one" : "Login"}
            </Text>
          </Animated.Text>
          <View style={{ marginVertical: 10 }} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

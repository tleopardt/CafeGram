import { View, Text, ImageBackground, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, fullHeight, fullWidth } from "../../../styles";
import Login from "./Form/Login";
import Register from "./Form/Register";
import { socialAuthToken } from "../../../config/constant";
import { GoogleAuth } from "./SocialLogin";
import * as SecureStore from "expo-secure-store";

export default function Auth({ setAuth }) {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const height = useRef(new Animated.Value(0)).current;
  const footerHeight = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  const transition = new Animated.Value(0);

  useEffect(() => {
    animationForm()
  }, []);

  useEffect(() => {
    if (loading) {
      animationSlide()
    }
  }, [loading]);

  const handleLogin = () => {
    setLoading(true);
  };

  const handleSocialAuth = async (val) => {
    if (val) {
      await SecureStore.setItemAsync('auth_session', JSON.stringify(val))
      setAuth(val);
    }
  };

  const switchForm = () => {
    setLogin(!login);
  };

  const animationSlide = () => {
    setTimeout(() => {
      Animated.timing(transition, {
        toValue: -fullWidth,
        duration: 250,
        useNativeDriver: false,
      }).start();

      setTimeout(async () => {
        setLoading(false);

        await SecureStore.setItemAsync(
          "auth_session",
          JSON.stringify({
            name: "Jonathan",
          })
        ).then(() => {
          setAuth(true);
        });

      }, 1000);
    }, 2000);
  }

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
  }

  return (
    <Animated.View style={{ transform: [{ translateX: transition }] }}>
      <ImageBackground
        style={{
          width: fullWidth,
          height: fullHeight,
        }}
        resizeMode="cover"
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/62e91f051b4d461f16d033a3/4319e53d-5a2a-4da2-ab77-2e7f4406d438/how-to-open-a-coffee-shop-in-singapore-food-shop-licenses%2B%281%29.jpg",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: `rgba(0,0,0,0.3)`,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "900",
              color: "#fff",
              paddingVertical: 20,
            }}
          >
            CafeGram
          </Text>

          <Animated.View
            style={{ width: "100%", height: height, overflow: "hidden" }}
          >
            {login ? (
              <Login handleLogin={handleLogin} loading={loading} />
            ) : (
              <Register handleLogin={handleLogin} loading={loading} />
            )}
            <Text
              style={{
                color: "#fff",
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
                onAuth={handleSocialAuth}
              />
            </View>
          </Animated.View>

          <Animated.View
            style={{
              height: 0.5,
              backgroundColor: "#fff",
              width: width,
              marginVertical: 20,
            }}
          />
          <Animated.Text style={{ color: "#fff", height: footerHeight }}>
            {login
              ? `Don't have any existing account?`
              : "Already have an account?"}
            <Text style={{ color: colors.brandLightPink }} onPress={switchForm}>
              &nbsp;{login ? "Create a new one" : "Login"}
            </Text>
          </Animated.Text>
          <View style={{ marginVertical: 10 }} />
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

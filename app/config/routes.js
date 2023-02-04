import React from "react";
import Tabs from "../components/Tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "./constant";
import Auth from "../components/screens/Auth";
import DetailCafe from "../components/screens/DetailCafe/DetailCafe";
import OnBoardingScreen from "../components/screens/OnBoarding";

const Stack = createNativeStackNavigator();

export default function MainRoutes({ auth, setAuth }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={ROUTES.App} component={OnBoardingScreen} /> */}
        <Stack.Screen name={ROUTES.App}>
          {() => <Tabs auth={auth} setAuth={setAuth} />}
        </Stack.Screen>
        <Stack.Screen name={ROUTES.Auth} component={Auth} />
        <Stack.Screen name={ROUTES.DetailCafe} component={DetailCafe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

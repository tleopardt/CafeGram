import React from "react";
import Tabs from "../components/Tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "./constant";
import DetailCafe from "../components/screens/DetailCafe/DetailCafe";
import Search from "../components/screens/Search";
import Browser from "../components/screens/Browser/Browser";

const Stack = createNativeStackNavigator();

export default function MainRoutes({ auth, logout }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.App}>
            {() => <Tabs auth={auth} logout={logout} />}
          </Stack.Screen>
          <Stack.Screen name={ROUTES.DetailCafe} component={DetailCafe} />
          <Stack.Screen name={ROUTES.Search} component={Search} />
          <Stack.Screen name={ROUTES.Browser} component={Browser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

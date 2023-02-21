import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabScreenOption } from "./config";
import { ROUTES } from "../../config/constant";
import Profile from "../screens/Profile/Profile";
import Home from "../screens/Home/Home";
import Explore from "../screens/Explore/Explore";

const Tab = createBottomTabNavigator();

export default function Tabs(props) {
  const { auth, logout } = props

  return (
    <Tab.Navigator screenOptions={tabScreenOption}>
      <Tab.Screen name={ROUTES.Home} component={Home} />
      <Tab.Screen name={ROUTES.Explore} component={Explore} />
      <Tab.Screen name={ROUTES.Profile}>
        {() => (
          <Profile auth={auth} logout={logout} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

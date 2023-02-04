import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../styles";

export const tabScreenOption = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "ios-home" : "ios-home-outline";
    } else if (route.name === "Explore") {
      iconName = focused ? "ios-search-sharp" : "ios-search";
    } else if (route.name === "Profile") {
      iconName = focused ? "ios-person" : "ios-person-outline";
    }

    return <Ionicons name={iconName} size={18} color={color} />;
  },
  tabBarActiveTintColor: colors.brandPink,
  tabBarInactiveTintColor: colors.dark,
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    borderTopWidth: 0,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    position: "absolute"
  },
});

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fullWidth } from "../../../styles";
import { Cafe } from "../Home/Home";
import { ROUTES } from "../../../config/constant";

export default function Explore(props) {
  const Content = ({ data }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(ROUTES.DetailCafe, { data: data })} style={{ margin: 1 }}>
      <Image
        style={{ width: (fullWidth - 6) / 3, height: fullWidth / 3 }}
        source={{
          uri: data.image,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Cafe.map((v, index) => (
              <Content data={v} key={index} />
            ))}
            {Cafe.map((v, index) => (
              <Content data={v} key={index} />
            ))}
            {Cafe.map((v, index) => (
              <Content data={v} key={index} />
            ))}
            {Cafe.map((v, index) => (
              <Content data={v} key={index} />
            ))}
            <View style={{ margin: 15 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

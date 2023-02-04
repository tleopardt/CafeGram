import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  fullHeight,
  fullWidth,
  headingText,
  rowContainer,
} from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DetailCafe({ route, navigation }) {
  const [expand, setExpand] = useState(2)
  const { name, address, image } = route.params.data;

  const handleExpand = () => {
    setExpand(expand == 2 ? 0 : 2)
  }

  return (
    <View style={{ backgroundColor: "#000" }}>
      <ImageBackground
        source={{ uri: image }}
        style={{ width: fullWidth, height: fullHeight }}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: expand == 0 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={[
              rowContainer,
              { paddingVertical: 15, paddingHorizontal: 20 },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-outline"
                style={{ fontSize: 25, color: "#fff" }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="ios-heart"
                style={{ fontSize: 25, color: "#fff" }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text
              style={{
                color: "#fff",
                padding: 5,
                backgroundColor: colors.brandGreen,
                alignSelf: "flex-start",
                borderRadius: 5,
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              OPEN
            </Text>
            <Text style={[headingText, { color: "#fff" }]}>{name}</Text>
            <Text
              style={{
                opacity: 0.7,
                fontSize: 12,
                marginBottom: 10,
                color: "#fff",
              }}
            >
              Nature, Modern
            </Text>
            <Text onPress={handleExpand} numberOfLines={expand} style={{ fontSize: 12, color: "#fff" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              {"\n"}
              {"\n"}
              <Ionicons style={{ color: colors.brandGreen }} name="ios-pricetags" /> Price Range: 14k - 21k
              {"\n"}
              <Ionicons style={{ color: colors.brand }} name="ios-fast-food" /> Variant Menu: 50 - 100
              {"\n"}
              <Ionicons name="ios-time" /> Open Hour: 24 Hours
              {"\n"}
              {"\n"}
              #cafehitsmalang #cafeestetik #malang
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, marginVertical: 10 }}>
              <Ionicons
                name="ios-location"
                style={{ color: colors.brandPink }}
              />
              &nbsp;&nbsp;{address}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

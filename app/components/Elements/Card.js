import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ROUTES } from "../../config/constant";
import { colors, fullWidth } from "../../styles";

export default function Card({
  item,
  navigation,
  disabled,
  orientation = "horizontal",
}) {
  const { nama_cafe, kecamatan, image } = item;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.DetailCafe, { data: item })}
      disabled={disabled}
    >
      {orientation === "vertical" ? (
        <View
          style={{
            flexDirection: "column",
            width: fullWidth / 2.5,
            borderRadius: 15,
            backgroundColor: "#fff",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 150,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: '#e9e9e9',
            }}
            source={{ uri: image ? image : null }}
          />
          <View style={{ padding: 10, height: 90 }}>
            {!disabled && (
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {nama_cafe}
                </Text>
                <Text style={styles.address} numberOfLines={1}>
                  <Ionicons name="ios-location" />
                  &nbsp;&nbsp;{kecamatan}
                </Text>
                <Text style={{ alignItems: "center", fontSize: 13 }}>
                  <Ionicons name="ios-star" style={{ color: "#ffe338" }} />
                  &nbsp;&nbsp;4.8&nbsp;
                  <Text style={{ fontWeight: "300" }}>(1500 Reviews)</Text>
                </Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={{ padding: 15, flex: 1, flexWrap: "wrap" }}>
            <Text style={styles.title} numberOfLines={1}>
              {nama_cafe}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
              <Ionicons name="ios-location" />
              &nbsp;&nbsp;{kecamatan}
            </Text>
            <Text style={{ alignItems: "center", fontSize: 13 }}>
              <Ionicons name="ios-star" style={{ color: "#ffe338" }} />
              &nbsp;&nbsp;4.8&nbsp;
              <Text style={{ fontWeight: "300" }}>(1500 Reviews)</Text>
            </Text>
          </View>
          <View style={styles.promo.wrapper}>
            <Text style={styles.promo.text}>10% OFF</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 100,
    // elevation: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    overflow: "hidden",
  },
  image: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "500",
    width: "80%",
  },
  address: {
    fontWeight: "300",
    alignItems: "center",
    fontSize: 13,
    paddingBottom: 13,
    width: "100%",
  },
  promo: {
    wrapper: {
      backgroundColor: "#ffe338",
      color: "#fff",
      borderRadius: 10,
      alignSelf: "center",
      position: "absolute",
      right: -5,
      top: -5,
      paddingBottom: 5,
      paddingLeft: 7,
      paddingRight: 11,
      paddingTop: 7,
    },
    text: { fontSize: 10, fontWeight: "500" },
  },
});

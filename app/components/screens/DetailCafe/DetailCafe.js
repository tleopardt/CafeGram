import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { colors, fullWidth, rowContainer } from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../../../config/constant";

export default function DetailCafe({ route, navigation }) {
  const {
    nama_cafe,
    kecamatan,
    image,
    jam_buka,
    tipe_menu,
    harga_terendah,
    harga_tertinggi,
    google_maps,
    menu_link,
  } = route.params.data;

  return (
    <SafeAreaView>
      <ImageBackground
        source={{ uri: image }}
        style={{ width: fullWidth, height: "100%" }}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.4)",
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
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View>
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
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: 30,
                  width: fullWidth / 1.5,
                }}
              >
                {nama_cafe}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  width: fullWidth / 1.5,
                }}
              >
                {kecamatan}
                {"\n"}
                {"\n"}
                Savor the moments with a warm cup of coffee and a sweet treat at
                our cozy cafe. Come and unwind with us today!
              </Text>

              <View style={{ flexDirection: "row", paddingTop: 20 }}>
                <Ionicons
                  name="ios-time"
                  style={{
                    width: 20,
                    height: 20,
                    fontSize: 20,
                    marginRight: 5,
                  }}
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {jam_buka}&nbsp;WIB
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-pricetags"
                  style={{
                    width: 20,
                    height: 20,
                    fontSize: 20,
                    marginRight: 5,
                  }}
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {harga_terendah / 1000} - {harga_tertinggi / 1000}K
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-checkmark"
                  style={{
                    width: 20,
                    height: 20,
                    fontSize: 20,
                    marginRight: 5,
                  }}
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {tipe_menu}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.Browser, { webUrl: menu_link })
                }
                style={{
                  borderRadius: 25,
                  marginRight: 10,
                }}
              >
                <Image
                source={{ uri: 'https://w1.pngwing.com/pngs/188/805/png-transparent-food-icon-tea-cooking-drink-kitchen-fast-food-logo-restaurant.png' }}
                  style={{ width: 45, height: 45, borderRadius: 25, color: "#fff" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.Browser, { webUrl: google_maps })
                }
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 25,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Image
                  source={{
                    uri: "https://cdn2.downdetector.com/static/uploads/c/300/1e9fd/download-1_OIDgSAZ.png",
                  }}
                  style={{ width: 25, height: 25 }}
                />
                <Text style={{ color: "#000", fontWeight: "600" }}>
                  &nbsp; Google Maps
                </Text>
                <Ionicons name="ios-chevron-forward" style={{ fontSize: 18 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

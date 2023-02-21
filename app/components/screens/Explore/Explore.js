import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Animated,
  Keyboard,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fullWidth } from "../../../styles";
import { getListCafe } from "../Home/Home";
import { ROUTES } from "../../../config/constant";
import { getResources } from "../OnBoarding";
import { smartMethod } from "../../../config/smartMethod";
import Input from "../../Elements/Input";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Explore(props) {
  const [listCafe, setListCafe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getAllData = async () => {
    const allPromise = Promise.all([getListCafe(), getResources()]);
    const promises = await allPromise;

    const { vote, parameter_kriteria } = promises[1].data;
    const { view, lokasi, harga, variasi_menu, jam_buka } = vote;
    const weight = [view, lokasi, harga, variasi_menu, jam_buka];

    const afterSmartMethod = await smartMethod(
      promises[0].data,
      weight,
      parameter_kriteria
    );
    setListCafe(afterSmartMethod);
    setLoading(false);
    setRefresh(false);
  };

  useEffect(() => {
    getAllData();
  }, [refresh]);

  const Content = ({ data }) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate(ROUTES.DetailCafe, { data: data })
      }
      style={{ margin: 1 }}
    >
      <Image
        style={{ width: (fullWidth - 6) / 3, height: fullWidth / 3 }}
        source={{
          uri: data.image,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 10 }}>
          <Input
            lefticon={
              <Ionicons
                name="ios-search"
                style={{
                  fontSize: 18,
                  padding: 10,
                  paddingRight: 0,
                }}
              />
            }
            noShadow
            placeholder="Search"
            onFocus={() =>
              props.navigation.navigate(ROUTES.Search, { data: listCafe })
            }
          />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {!loading ? (
            listCafe.map((v, index) => <Content data={v} key={index} />)
          ) : (
            <View
              style={{
                paddingVertical: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={colors.brandPink} />
            </View>
          )}
          <View style={{ margin: 15 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

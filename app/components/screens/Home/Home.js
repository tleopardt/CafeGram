import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  colors,
  headingText,
  pageWrapper,
  rowContainer,
} from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../Elements/Input";
import Card from "../../Elements/Card";
// import Modal from "../../Elements/Modal";
import { API_CAFEGRAM } from "../../../config/api";
import { smartMethod } from "../../../config/smartMethod";
import { kecamatan, ROUTES, Thumbnail } from "../../../config/constant";
import { getResources } from "../OnBoarding";

export const getListCafe = async () => {
  try {
    const response = await API_CAFEGRAM.get("e92286b5eb478e237e52");
    response.data = response.data.map((val) => ({
      ...val,
      image: Thumbnail[Math.floor(Math.random() * Thumbnail.length)],
    }));
    return response;
  } catch (err) {
    Alert.alert(`Something Error ${err}`);
    return false;
  }
};

export default function Home(props) {
  const [visible, setVisisble] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listCafe, setListCafe] = useState([]);
  const [location, setLocation] = useState('Klojen');

  const scrollRef = useRef(null);
  const observer = useRef(null);
  const [targetScroll, setTargetScroll] = useState();

  const onClose = () => {
    setVisisble(false);
  };

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
    // console.log(JSON.stringify(afterSmartMethod.map((v, index) => index < 10 && ({ nama_cafe: v.nama_cafe, tipe_cafe: v.tipe_cafe, lokasi: v.kecamatan, harga: v.harga_terendah + ' - ' + v.harga_tertinggi, variasi_menu: v.variasi_menu, jam_buka: v.jam_buka }))));
    setListCafe(afterSmartMethod);
    setLoading(false);
  };

  const handleChange = (val) => {
    setLocation(val);
  };

  const handleObserver = () => {
    observer.current.measure((x, y, width, height, pageX, pageY) => {
      setTargetScroll(pageY);
    });
  };

  const scrollToPage = () => {
    scrollRef.current.scrollTo({ y: targetScroll, animated: true });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <View style={pageWrapper}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ref={scrollRef}
        >
          {/* Header */}
          <View
            style={[rowContainer, { paddingHorizontal: 20, paddingTop: 15 }]}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "300", marginBottom: 3 }}>
                Location
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setVisisble(true)}
              >
                <Ionicons name="ios-location" style={{ fontSize: 18 }} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    paddingHorizontal: 3,
                  }}
                >
                  Kota Malang, Kec. {location}
                </Text>
                <Ionicons name="ios-chevron-down" style={{ fontSize: 15 }} />
              </TouchableOpacity>
              {/* <Modal
                visible={visible}
                title="Find your location"
                option={kecamatan}
                onChange={handleChange}
                onClose={onClose}
              /> */}
            </View>
            <TouchableOpacity>
              <Ionicons name="ios-notifications" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
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

          <View style={{ overflow: "hidden" }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              <View
                style={{
                  height: 150,
                  width: "100%",
                  borderRadius: 15,
                  backgroundColor: "#eaac8d",
                  elevation: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <View style={{ padding: 20, zIndex: 1 }}>
                  <View style={[rowContainer, { width: 100 }]}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "900",
                          color: "#fff",
                          width: 120,
                        }}
                      >
                        Welcome to CafeGram
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          width: 100,
                          opacity: 0.7,
                          fontStyle: "italic",
                          paddingVertical: 5,
                        }}
                      >
                        Go grab your first voucher discount!
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 35,
                        color: "#fff",
                        fontWeight: "900",
                        fontStyle: "italic",
                      }}
                    >
                      50%
                    </Text>
                  </View>
                </View>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    position: "absolute",
                    right: 0,
                  }}
                  source={{
                    uri: "https://img.freepik.com/premium-vector/coffee-cup-flat-design-vector-image-cup-coffee-top-view-flat-style-with-long-shadow_695505-14.jpg",
                  }}
                />
              </View>
            </View>

            <View
              style={[
                rowContainer,
                { paddingBottom: 20, paddingHorizontal: 20 },
              ]}
            >
              <Text style={headingText}>Cafe near by</Text>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
              <FlatList
                data={
                  !loading
                    ? listCafe
                        .filter((val) => val.kecamatan === location)
                        .sort(() => Math.random() - 0.5)
                    : [0, 1, 2]
                }
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                keyExtractor={(_, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card
                    orientation="vertical"
                    item={item}
                    navigation={props.navigation}
                    disabled={loading}
                  />
                )}
              />
            </View>

            <View
              style={[
                rowContainer,
                { paddingVertical: 20, paddingHorizontal: 20 },
              ]}
              ref={observer}
              onLayout={handleObserver}
            >
              <Text style={headingText}>Explore</Text>
              <TouchableOpacity onPress={scrollToPage}>
                <Text style={{ color: colors.brand, fontWeight: "500" }}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            {!loading ? (
              listCafe.map((item, index) => (
                <Card key={index} item={item} navigation={props.navigation} />
              ))
            ) : (
              <View
                style={{
                  paddingHorizontal: 20,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={colors.brandPink} />
              </View>
            )}
          </View>
          <View style={{ margin: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

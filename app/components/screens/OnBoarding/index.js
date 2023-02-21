import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors, fullWidth } from "../../../styles";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { slidesArr } from "../../../config/constant";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

function OnBoardingScreen({ setIsVote }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(false);
  const transition = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const nextSlide = () => {
    if (currentIndex < slidesArr.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // console.log("end");
    }
  };

  const handleCriteria = (val) => {
    const { name, value } = val;
    if (name === "lokasi") {
      setCriteria({
        ...criteria,
        [name]:
          value === "Klojen"
            ? "pusat_kota"
            : value === "Kedungkandang"
            ? "pinggir_kota"
            : "tengah_kota",
      });
    } else {
      setCriteria({
        ...criteria,
        [name]: value,
      });
    }

    nextSlide();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const user = await SecureStore.getItemAsync("auth_session");
    const currentValue = await getResources();

    if (currentValue) {
      const { view, variasi_menu, lokasi, jam_buka, harga } =
        currentValue.data.parameter_kriteria;

      // add new member
      const findUser = currentValue.data.account.find(
        (val) => val.email === JSON.parse(user).email
      );
      if (!findUser) {
        const newAccount = {
          email: JSON.parse(user).email,
          vote: true,
        };
        currentValue.data.account.push(newAccount);
      } else {
        findUser["vote"] = true;
      }

      // add votes
      currentValue.data = {
        ...currentValue.data,
        parameter_kriteria: {
          ...currentValue.data.parameter_kriteria,
          view: {
            ...view,
            [criteria.view]: view[criteria.view] + 1,
          },
          variasi_menu: {
            ...variasi_menu,
            [criteria.variasi_menu]: variasi_menu[criteria.variasi_menu] + 1,
          },
          lokasi: {
            ...lokasi,
            [criteria.lokasi]: lokasi[criteria.lokasi] + 1,
          },
          jam_buka: {
            ...jam_buka,
            [criteria.jam_buka]: jam_buka[criteria.jam_buka] + 1,
          },
          harga: {
            ...harga,
            [criteria.harga]: harga[criteria.harga] + 1,
          },
        },
      };

      const response = await updateResources(currentValue.data);
      const setUser = {
        ...JSON.parse(user),
      };

      if (response) {
        await SecureStore.setItemAsync(
          "auth_session",
          JSON.stringify({ ...setUser, vote: true })
        );
        animationSlide();

        setTimeout(() => {
          setIsVote(true);
        }, 2000);
      }
    }
  };

  const animationSlide = () => {
    Animated.timing(transition, {
      toValue: -fullWidth,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ translateX: transition }] }}>
      <ImageBackground
        style={{ width: fullWidth, height: "100%" }}
        source={{
          uri: "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View style={{ flex: 3 }}>
            <FlatList
              data={slidesArr}
              renderItem={({ item }) => (
                <OnBoardingItem item={item} handleCriteria={handleCriteria} />
              )}
              keyExtractor={(_, index) => index}
              horizontal
              onScrollToIndexFailed={() => {}}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              // scrollEnabled={false}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </View>
          <Paginator data={slidesArr} scrollX={scrollX} />
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {Object.values(criteria).length === 5 && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.brandPink,
                  padding: 15,
                  paddingHorizontal: 17,
                  borderRadius: 50,
                  elevation: 3,
                }}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={"#fff"} />
                ) : (
                  <Ionicons
                    name="ios-chevron-forward"
                    style={{ color: "#fff", fontSize: 25 }}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

export default OnBoardingScreen;

export const updateResources = async (data) => {
  try {
    const response = await axios.put(
      "https://json.extendsclass.com/bin/a3727e4966ca",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Security-key": "654321ccd",
        },
      }
    );
    return response;
  } catch (err) {
    Alert.alert(`Something Error ${err}`);
    return false;
  }
};

export const getResources = async () => {
  try {
    const response = await axios.get(
      "https://json.extendsclass.com/bin/a3727e4966ca",
      {
        headers: {
          "Content-Type": "application/json",
          "Security-key": "654321ccd"
        },
      }
    );
    return response;
  } catch (err) {
    Alert.alert(`Something Error ${err}`);
    return false;
  }
};

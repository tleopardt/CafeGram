import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { colors, fullHeight, fullWidth } from "../../../styles";
// import * as SecureStore from 'expo-secure-store';
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ROUTES } from "../../../config/constant";

function OnBoardingScreen(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [criteria, setCriteria] = useState([]);

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
    setCriteria({
      ...criteria,
      [val.name]: val.value,
    });

    nextSlide();
  };

  const slidesArr = [
    {
      name: "view",
      title: 'Before We Start',
      question: "Please choose category view of cafe do you like?",
      option: ["Natural", "Coastal", "Vintage", "Modern", "Industrial"],
    },
    {
      name: "location",
      title: 'Next Question',
      question: "Which districts of Malang do you live?",
      option: ["Klojen", "Sukun", "Lowokwaru", "Blimbing", "Kedungkandang"],
    },
    {
      name: "price",
      title: 'Next Question',
      question: "How much price do you prefer?",
      option: [
        "Low", //   "Tidak lebih dari Rp. 35.000"
        "Middle", //   "Lebih dari Rp. 35.000, tidak lebih dari 70.000"
        "Expensive", //   "Lebih dari Rp. 70.000"
      ],
    },
    {
      name: "menu",
      title: `You're Almost There`,
      question: "How much variant menu do you prefer?",
      option: [
        "A bit", //  Kurang dari 25
        "Enough", //  Lebih dari 25, tidak lebih dari 50
        "A lot / Complete", //  Lebih dari 50
      ],
    },
    {
      name: "opentime",
      title: `Let's Get Started`,
      question: "Which one do you prefer for open time?",
      option: [
        "8 Hours", //  7 - 8 jam
        "16 Hours", //  9 - 16 jam
        "24 Hours", //  17 - 24 jam
      ],
    },
  ];

  // const clearOnboarding = async() => {
  //   await SecureStore.setItemAsync('viewedOnboarding', '1')
  //   props.setViewedOnboarding(true)
  // }

  return (
    <ImageBackground
      style={{ flex: 1, width: fullWidth, height: fullHeight }}
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
          {criteria?.opentime && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.brandPink,
                padding: 15,
                paddingHorizontal: 17,
                borderRadius: 50,
                elevation: 3,
              }}
              onPress={() => props.navigation.navigate(ROUTES.Tabs)}
            >
              <Ionicons
                name="ios-chevron-forward"
                style={{ color: "#fff", fontSize: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

export default OnBoardingScreen;

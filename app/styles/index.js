import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const colors = {
  textBase: "black",
  textMedium: "#585858",
  textSecondary: "#AAA",
  textLight: "#FEFEFF",
  brand: "#e59c3e",
  brandBlue: "#122673",
  brandLightBlue: "#0080FF",
  brandDarkBlue: "#002787",
  brandGreen: "#24A83D",
  brandRed: "#DD1A1A",
  brandPink: "#D8356A",
  brandLightPink: "#F7A0CB",
  dark: "#222222",

  inputBase: "rgba(174, 173, 173, 0.725)",
  inputTint: "#fff",
  error: "#DD1A1A",
  errorContainer: "#cc4125",
};

export const headingText = {
  fontSize: 20,
  fontWeight: "700",
};

export const pageContainer = {
  flex: 1,
};

export const pageWrapper = {
  flex: 1,
  backgroundColor: "#f9f9f9"
};

export const scrollContainer = {
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingVertical: 15,
};

export const rowContainer = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

export const errorContainer = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 10,
};

export const topLeftIcon = {
  position: "absolute",
  top: 20,
  left: 15,
};

export const avatar = {
  width: 85,
  height: 85,
  borderRadius: 42.5,
};

export const avatarMedium = {
  width: 70,
  height: 70,
  borderRadius: 35,
};

export const backgroundImage = {
  flex: 1,
  alignSelf: "stretch",
  width: null,
  height: null,
};

export const buttons = {
  primary: {
    backgroundColor: "#19d860",
  },
  text: {
    color: colors.textBase,
    fontSize: 16,
  },
};

export const inputIcon = {
  width: 30,
  height: 30,
  resizeMode: "contain",
};

export const buttonRightIcon = {
  position: "absolute",
  right: 20,
};

export const activityIndicator = {
  marginTop: 80,
};

export const windowSpacing = 20;

export const textfieldHeight = 72;

export const textError = {
  fontSize: 18,
  color: colors.brandRed,
};

export const fullWidth = width;
export const fullHeight = height;

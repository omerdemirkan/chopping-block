import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../../config/spacing";
import { Theme, useTheme } from "../contexts/ThemeContext";

type ScreenProps = {
  style?: StyleProp<ViewStyle>;
  hasHorizontalPadding?: boolean;
  bottomTabTheme?: Theme;
};

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  hasHorizontalPadding,
  bottomTabTheme,
}) => {
  const { setBottomTabTheme } = useTheme();

  // useFocusEffect listens to changes in the function reference.
  useFocusEffect(
    useCallback(() => {
      setBottomTabTheme(bottomTabTheme || "light");
    }, [bottomTabTheme])
  );
  // useEffect(() => {
  //   setBottomTabTheme(bottomTabTheme || "light");
  // }, [bottomTabTheme]);
  return (
    <SafeAreaView
      style={[
        styles.root,
        { paddingHorizontal: hasHorizontalPadding ? spacing.paddingM : 0 },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

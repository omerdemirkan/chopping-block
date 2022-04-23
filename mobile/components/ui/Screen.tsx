import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../../config/spacing";

type ScreenProps = {
  style?: StyleProp<ViewStyle>;
  hasHorizontalPadding?: boolean;
};

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  hasHorizontalPadding,
}) => {
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

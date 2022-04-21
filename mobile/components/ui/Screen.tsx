import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Screen: React.FC = ({ children }) => {
  return <SafeAreaView style={style.root}>{children}</SafeAreaView>;
};

const style = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flex: 1,
  },
});

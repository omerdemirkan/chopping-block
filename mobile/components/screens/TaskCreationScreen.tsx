import { StyleSheet, Text } from "react-native";
import { Screen } from "../ui/Screen";

export function TaskCreationScreen() {
  return (
    <Screen>
      <Text>Task Creation Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

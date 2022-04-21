import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Screen } from "../ui/Screen";

export function TaskFocusScreen() {
  return (
    <Screen>
      <Text>Task Focus Screen</Text>
      <StatusBar style="auto" />
    </Screen>
  );
}

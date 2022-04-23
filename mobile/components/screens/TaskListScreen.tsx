import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Screen } from "../ui/Screen";

export const TaskListScreen = () => {
  return (
    <Screen>
      <Text>Task List Screen</Text>
      <StatusBar style="auto" />
    </Screen>
  );
};

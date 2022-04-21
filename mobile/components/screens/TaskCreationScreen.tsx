import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export function TaskCreationScreen() {
  return (
    <View style={styles.container}>
      <Text>Task Creation Screen</Text>
      <StatusBar style="auto" />
    </View>
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

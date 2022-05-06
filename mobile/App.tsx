import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { RootNavigator } from "./components/navigators/RootNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

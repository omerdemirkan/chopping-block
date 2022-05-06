import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { TaskListScreen } from "../screens/TaskListScreen";
import { TaskFocusScreen } from "../screens/TaskFocusScreen";
import { TaskCreationScreen } from "../screens/TaskCreationScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext";

export enum TabScreenName {
  TaskList = "TaskList",
  TaskFocus = "TaskFocus",
  TaskCreation = "TaskCreation",
}

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { bottomTabColors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={TabScreenName.TaskList}
      screenOptions={rootOptions}
      defaultScreenOptions={{
        tabBarStyle: { borderTopWidth: 0 },
      }}
    >
      <Tab.Screen
        name={TabScreenName.TaskCreation}
        component={TaskCreationScreen}
        options={{
          ...taskCreationOptions,
          tabBarActiveBackgroundColor: bottomTabColors.bg1,
          tabBarInactiveBackgroundColor: bottomTabColors.bg1,
        }}
      />
      <Tab.Screen
        name={TabScreenName.TaskFocus}
        component={TaskFocusScreen}
        options={{
          ...taskFocusOptions,
          tabBarActiveBackgroundColor: bottomTabColors.bg1,
          tabBarInactiveBackgroundColor: bottomTabColors.bg1,
        }}
      />
      <Tab.Screen
        name={TabScreenName.TaskList}
        component={TaskListScreen}
        options={{
          ...tabListOptions,
          tabBarActiveBackgroundColor: bottomTabColors.bg1,
          tabBarInactiveBackgroundColor: bottomTabColors.bg1,
        }}
      />
    </Tab.Navigator>
  );
};

const rootOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const tabListOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => {
    const { bottomTabColors } = useTheme();
    return (
      <Ionicons
        name="list"
        size={24}
        color={focused ? bottomTabColors.fg1 : bottomTabColors.fg3}
      />
    );
  },
  tabBarLabel: () => null,
};
const taskFocusOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => {
    const { bottomTabColors } = useTheme();
    return (
      <Ionicons
        name="checkmark-done-sharp"
        size={24}
        color={focused ? bottomTabColors.fg1 : bottomTabColors.fg3}
      />
    );
  },
  tabBarLabel: () => null,
};
const taskCreationOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => {
    const { bottomTabColors } = useTheme();
    return (
      <Ionicons
        name="add"
        size={28}
        color={focused ? bottomTabColors.fg1 : bottomTabColors.fg3}
      />
    );
  },
  tabBarLabel: () => null,
};

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { TaskListScreen } from "../screens/TaskListScreen";
import { TaskFocusScreen } from "../screens/TaskFocusScreen";
import { TaskCreationScreen } from "../screens/TaskCreationScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../config/colors";

export enum TabScreenName {
  TaskList = "TaskList",
  TaskFocus = "TaskFocus",
  TaskCreation = "TaskCreation",
}

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TabScreenName.TaskList}
      screenOptions={rootOptions}
    >
      <Tab.Screen
        name={TabScreenName.TaskCreation}
        component={TaskCreationScreen}
        options={taskCreationOptions}
      />
      <Tab.Screen
        name={TabScreenName.TaskFocus}
        component={TaskFocusScreen}
        options={taskFocusOptions}
      />
      <Tab.Screen
        name={TabScreenName.TaskList}
        component={TaskListScreen}
        options={tabListOptions}
      />
    </Tab.Navigator>
  );
};

const rootOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const tabListOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons name="list" size={24} color={focused ? colors.fg1 : colors.fg3} />
  ),
  tabBarLabel: () => null,
};
const taskFocusOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="checkmark-done-sharp"
      size={24}
      color={focused ? colors.fg1 : colors.fg3}
    />
  ),
  tabBarLabel: () => null,
};
const taskCreationOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons name="add" size={28} color={focused ? colors.fg1 : colors.fg3} />
  ),
  tabBarLabel: () => null,
};

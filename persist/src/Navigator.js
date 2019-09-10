import { createStackNavigator, createAppContainer } from "react-navigation";

import { Home } from "./components/Home/Home";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

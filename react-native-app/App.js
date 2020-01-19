import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Start from "./components/Start";
import Scanner from "./components/Scanner";
import Article from "./components/Article";

const MainNavigator = createStackNavigator({
  Home: {screen: Start},
  Scan: {screen: Scanner},
  Article: {screen: Article}
}, {mode: "modal", headerMode: "none", initialRouteKey: "Home"});

const App = createAppContainer(MainNavigator);

export default App;
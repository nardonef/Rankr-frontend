
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux'
import {store} from './src/redux/store'

import InitialRoute from './src/containers/InitialRoute'
import LogIn from './src/containers/LogIn';
import Home from "./src/containers/Home";
import AddCollection from "./src/containers/AddCollection";
import Search from "./src/containers/Search"
import Collection from "./src/containers/Collection";
import SignUp from "./src/containers/SignUp"
import Walkthrough from "./src/containers/Walkthrough"

const App = () => {
  const Stack = createStackNavigator();

  return (
      <StoreProvider store={store}>

        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
              initialRouteName="InitialRoute">
              <Stack.Screen name="InitialRoute" component={InitialRoute}/>
              <Stack.Screen name="LogIn" component={LogIn}/>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Collection" component={Collection}/>
              <Stack.Screen name="AddCollection" component={AddCollection}/>
              <Stack.Screen name="Search" component={Search}/>
              <Stack.Screen name="SignUp" component={SignUp}/>
              <Stack.Screen name="Walkthrough" component={Walkthrough}/>
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
  );
};


export default App;

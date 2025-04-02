import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CurrencyConverter from './components/CurrencyConverter';
import HomeScreen from './screens/HomeScreen';
import ShowCurrency from './screens/ShowCurrency'; // Import the new screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="CurrencyConverter"
          component={CurrencyConverter}
          options={{ title: 'Currency Converter' }}
        />
        <Stack.Screen
          name="ShowCurrency"
          component={ShowCurrency}
          options={{ title: 'Currency Rates' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
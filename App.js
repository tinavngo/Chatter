import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";

const App = () => {

  // create the navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Screen1'
      >
        <Stack.Screen
        name="Start"
        component={Start}
        />
        <Stack.Screen
        name="Chat"
        component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* 
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  }
});
*/

export default App;
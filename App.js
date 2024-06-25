import { StyleSheet, LogBox } from 'react-native';

// import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Firebase + initializor
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import screens to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// logbox void
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {

// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK93oXUDAMlqXfnTsxtssLZC7ku9tRtl0",
  authDomain: "chatapp-175af.firebaseapp.com",
  projectId: "chatapp-175af",
  storageBucket: "chatapp-175af.appspot.com",
  messagingSenderId: "912992626105",
  appId: "1:912992626105:web:f17822816b75c570b64268"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// create the navigator
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Start'
      >
        <Stack.Screen
        name="Welcome"
        component={Start}
        />

        <Stack.Screen
        name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
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
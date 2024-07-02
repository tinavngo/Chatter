import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';


const Chat = ({ route, navigation, db, isConnected }) => {
    const { userID, name, background } = route.params;
    const [messages, setMessages] = useState([]);
    // Send new messages
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    };

    // Chat bubble
    const renderBubble = (props) => {
      return (
       <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
      />
     );
    }


    // Keep input when connection exists otherwise, null
    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }


    // useEffect hook to set messages options
    let unsubMessages;
    // render Firebase data
    useEffect(() => {
      if (isConnected === true){
        //unregister current onSnapshot() listener to avoid registering multiple listeners when
        // useEffect code is re-executed.
        if (unsubMessages) unsubMessages();
        unsubMessages = null;
        // set title to username
        navigation.setOptions({ title: name });
        // Create a query to get the "messages" collection from the Firestore database
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        // This function will be called whenever there are changes in the collection.
         unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
        // Iterate through each document in the document
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
        });
      } else loadCachedMessages();

      // Clean up code

      return () => {
        if (unsubMessages) unsubMessages();
      };
    }, [isConnected]); // isConnected used as a dependency value enabling the component to call the callback of useEffect whenever the isConnected prop's value changes.
  

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem(
          "messages",
          JSON.stringify(messagesToCache)
        );
      } catch (error) {
        console.log(error.message);
      }
    };


    // Call this function when isConnected prop turns out to be false in useEffect()
    const loadCachedMessages = async () => {
      // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn't been set yet in AsyncStorage.
      const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(cachedMessages));
    };

    
    const renderCustomActions = (props) => {
      return <CustomActions {...props} />
    };


    const renderCustomView = (props) => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
          style={{ 
            width: 100,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitutde,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          />
        );
      }
      return null;
    }


 return (
   <View style={[styles.container, { backgroundColor: background}]}>
    <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name
        }}
      />
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;
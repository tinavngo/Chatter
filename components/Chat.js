import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, FlatList, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({route, navigation, db}) => {
    const { userID, name, background } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    };

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

    // Set user name
    useEffect(() => {
      navigation.setOptions({ title: name });
  }, []);

    // render Firebase data
    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (documentSnapShot) => {
        let newMessages = [];
        documentSnapShot.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        setMessages(newMessages);
      });

      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, []);



 return (
   <View style={[styles.container, { backgroundColor: background}]}>
    <FlatList
  data={messages}
  renderItem={({ message }) =>
    <Text>{message.text}</Text>}
/>
    <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
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
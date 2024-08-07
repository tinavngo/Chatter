import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const auth = getAuth();
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [name, setName] = useState('');
    const [background, setBackground] = useState('');

const signInUser = () => {
    signInAnonymously(auth)
    .then(result => {
        navigation.navigate("Chat", { userID: result.user.uid, name: name, background: background });
        Alert.alert("Signed in Successfully!");
    })
    .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
    })
}

return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Background Image.png")}
        style={styles.imageBackground}
      >
        <Text style={styles.title}>Chatter</Text>
        <View style={styles.box}>
            {/* input for user's name */}
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your username"
           />
            {/* background color */}
        <Text style={styles.chooseBgColor}>
                        Choose a background color:
        </Text>
        <View style={styles.bgButton}>
            
        {/* callback for setBackground */}
        {colors.map((color, index) => (
        <TouchableOpacity
             key={index}
             style={[styles.circles, { backgroundColor: color }, background === color && styles.selectedColor,]}
             onPress={() => setBackground(color)}
            />
          ))}
        </View>
            {/* start chat */}
        <TouchableOpacity
          accessibilityLabel="Start Chatting"
          accessibilityRole="button"
          style={styles.button}
          onPress={signInUser}>
                <Text style={styles.chatButtonText}>Start Chatting</Text>
         </TouchableOpacity>
       </View>
       {/* fix keyboard view */}
       {Platform.OS === "android" ? (<KeyboardAvoidingView behavior="height" />) : null }
     </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 25,
    },
    box: {
        // backgroundColor: '#ffffff', 
        backgroundColor: '#f2f2f2',
        width: '88%',
        height: '44%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '10%'
    },
    textInput: {
        width: '88%',
        borderColor: '#757083',
        borderRadius: 4,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginBottom: 10,
    },
    chooseBgColor: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100,
    },
    bgButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    circles: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selectedColor: {
        borderColor: '#c0c0c0',
        borderWidth: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 4,
        height: '20%',
        justifyContent: 'center',
        padding: 10,
        width: '88%',
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    }
});


export default Start;
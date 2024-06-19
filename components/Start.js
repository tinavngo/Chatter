import { startTransition } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chatter</Text>
            <TextInput
        style={styles.textInput}
        placeholder='Your name'
      />
            <Button
            title="Go to Chat"
            onPress={() => navigation.navigate('Chat')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 3,
        fontSize: 45,
        fontWeight: 600,
        fontColor: '#FFFFFF'
    }
});

export default Start;
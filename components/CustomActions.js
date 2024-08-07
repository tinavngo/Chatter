import { useActionSheet } from "@expo/react-native-action-sheet";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    // actionSheet displays the menu of actions stored in const options
    const actionSheet = useActionSheet();

    // get and send location
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occured while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    }

    // saves images to library
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image:imageURL })
        });
    }

    // choose a photo from library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    // take a photo and upload
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if(permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    // Allow for more than one image to be sent
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`
    }


    // create menu options for media
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                        case 1:
                            takePhoto();
                            return;
                            case 2:
                                getLocation();
                                default:
                }
            },
        );
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}
        accessible={true}
        accessibilityLabel="Send messages through the input field and click on the icon for more media options."
        accessibilityHint="Choose to select a photo from library, take a picture, or send your location."
        accessibilityRole="button"
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
});

export default CustomActions;
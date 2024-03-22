import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    //Button,
    TextInput,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

//get auth
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const image = require('../assets/BackgroundImage.png'); // Image background source
    const icon = require('../assets/icon.png');

    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                navigation.navigate('Chat', {
                    name: name,
                    background: background,
                    id: result.user.uid,
                });
                Alert.alert('Signed in Successfully!');
            })
            .catch((error) => {
                Alert.alert('Unable to sign in, try later again.');
            });
    };
    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    return (
        <View style={styles.container}>
            {/*background image */}
            <ImageBackground
                source={image}
                style={styles.image}
                resizeMode='cover'
            >
                {/*greetings&title*/}
                <Text style={styles.appTitle}>Hey! good to see you here.</Text>
                <View style={styles.containerWhite}>
                    {/*user input*/}
                    <View style={styles.inputContainer}>
                        <Image source={icon} style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your name'
                            placeholderTextColor='#757083'
                        />
                    </View>

                    <Text style={styles.chooseColourText}>
                        Choose colour for your space:
                    </Text>

                    {/*four different colours*/}
                    <View style={styles.colorButtonsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: '#090C08',
                                    opacity:
                                        selectedColor === '#090C08' ? 1 : 0.7,
                                },
                            ]}
                            onPress={() => handleColorSelection('#090C08')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: '#474056',
                                    opacity:
                                        selectedColor === '#474056' ? 1 : 0.7,
                                },
                            ]}
                            onPress={() => handleColorSelection('#474056')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: '#8A95A5',
                                    opacity:
                                        selectedColor === '#8A95A5' ? 1 : 0.7,
                                },
                            ]}
                            onPress={() => handleColorSelection('#8A95A5')}
                        />
                        <TouchableOpacity
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: '#B9C6AE',
                                    opacity:
                                        selectedColor === '#B9C6AE' ? 1 : 0.7,
                                },
                            ]}
                            onPress={() => handleColorSelection('#B9C6AE')}
                        />
                    </View>

                    {/*chat button */}
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel='Entre your space'
                        accessibilityHint='Start the chat'
                        accessibilityRole='button'
                        style={styles.entreButton}
                        onPress={signInUser}
                    >
                        <Text style={styles.enterSpaceButton}>
                            Entre your space
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
    },
    containerWhite: {
        backgroundColor: 'white',
        width: '88%',
        height: '44%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
        borderRadius: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#757083',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 2,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    chooseColourText: {
        fontSize: 16,
        color: '#757083',
        fontWeight: '300',
        opacity: 1,
        marginTop: 10,
    },
    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
    },
    entreButton: {
        backgroundColor: '#757083',
        padding: 20,
        margin: 20,
        alignItems: 'center',
        width: '88%',
        borderRadius: 2,
    },
    enterSpaceButton: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default Start;

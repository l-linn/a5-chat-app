// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import functions for initializing firestore
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    disableNetwork,
    enableNetwork,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyCLsRUH5D-xanOH6I5QRQcnd32moDELkSY',
        authDomain: 'chat-app-9463f.firebaseapp.com',
        projectId: 'chat-app-9463f',
        storageBucket: 'chat-app-9463f.appspot.com',
        messagingSenderId: '279958087894',
        appId: '1:279958087894:web:84d980346c3a9451190177',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const storage = getStorage(app);

    const connectionStatus = useNetInfo();

    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert('Connection Lost!');
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name='Start' component={Start} />
                <Stack.Screen name='Chat'>
                    {(props) => (
                        <Chat
                            db={db}
                            isConnected={connectionStatus.isConnected}
                            storage={storage}
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

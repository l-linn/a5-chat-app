import { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const { name, backgroundColor, id } = route.params;
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    useEffect(() => {
        navigation.setOptions({ title: name });

        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'desc')
        );
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    // Customise speech bubble
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000',
                    },
                    left: {
                        backgroundColor: '#FFF',
                    },
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: id,
                    name,
                }}
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
    },
});

export default Chat;

import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer, you have entred your space.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placebear.com/140/140',
                },
            },

            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
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
                    _id: 1,
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

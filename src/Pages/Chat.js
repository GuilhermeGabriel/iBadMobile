import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import MessageItem from '../components/MessageItem';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [myUser, setMyuser] = useState('');

  useEffect(() => {
    async function getUser() {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      setMyuser(user);
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getMessages() {
      const { user_id_db_id, user_google_id } = route.params;
      console.log(route.params)

      const response_conversation = await api.get('/conversation', {
        params: {
          google_id: user_google_id,
          user_id: user_id_db_id
        }
      });

      const conversationId = response_conversation.data[0]._id
      if (!conversationId) return;

      const response_messages = await api.get('/messages', {
        params: {
          google_id: user_google_id,
          conversation_id: conversationId
        }
      });

      setMessages(response_messages.data);
    }
    getMessages();
  }, []);

  async function sendMessage() {
    if (input !== '') {
      const { user_id_db_id, user_google_id } = route.params;
      const response = await api.post('/messages', {
        google_id: user_google_id,
        user_id: user_id_db_id,
        message: input
      });

      setInput('');
    }
  }

  if (!myUser) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator size={48} color='#000' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>@{route.params.username}</Text>
      </View>

      <FlatList
        style={styles.chatContainer}
        keyExtractor={(item) => item._id}
        data={messages}
        renderItem={({ item }) =>
          <MessageItem
            position={(item.owner_id !== myUser._id) ? 'left' : 'right'}
            data={item}
          />
        }
      />

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(txt) => { setInput(txt) }}
          placeholderTextColor='#797979'
          placeholder='Escreva aqui...' />

        <RectButton
          style={styles.send}
          onPress={() => sendMessage()}>
          <Ionicons name="md-send" size={24} color="black" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    paddingStart: 16,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold'
  },
  chatContainer: {
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontWeight: 'bold',
    borderRadius: 16,
    margin: 16,
    padding: 12,
    backgroundColor: '#e1e1e1'
  },
  send: {
    padding: 16,
    marginRight: 8
  }
});

export default Chat;
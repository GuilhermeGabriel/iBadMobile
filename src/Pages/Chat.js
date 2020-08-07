import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function getMessages() {
      const { user_id_db_id, user_google_id } = route.params;

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
          google_id: "gi005",
          conversationId: "5f2c98b4fdd3d357a84cbff0"
        }
      });

      console.log(response_messages.data);
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

  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>@Fulano</Text>
      </View>

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
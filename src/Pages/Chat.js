import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const Chat = ({ route }) => {
  const [idConversation, setIdConversation] = useState('');

  useEffect(() => {
    async function getMessages() {
      const { user_id_db_id, user_id } = route.params;

      const response = await api.get('/conversation', {
        params: {
          google_id: user._id,
          user_id
        }
      });

      setIdConversation(response.data[0]._id)
    }
    getMessages();
  }, []);

  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>@Fulano</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholderTextColor='#797979'
        placeholder='Escreva aqui...' />
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
  input: {
    fontWeight: 'bold',
    borderRadius: 16,
    margin: 16,
    padding: 12,
    backgroundColor: '#e1e1e1'
  }
});

export default Chat;
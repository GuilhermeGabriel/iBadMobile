import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import ChatItem from '../components/ChatItem';

const Chats = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [myUser, setMyuser] = useState('');

  useEffect(() => {
    async function getUser() {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      setMyuser(user);

      const response = await api.get('/conversations', {
        params: {
          google_id: user.id
        }
      });


      response.data.map(async conversation => {
        const otherUser = conversation.users.filter(id => id !== myUser._id)[0];

        const response = await api.get('/users', {
          params: {
            user_id: otherUser
          }
        });

        setConversations([
          ...conversations,
          {
            username: response.data.username,
            user_google_id: user.id,
            user_id_db_id: otherUser
          }
        ])
      });
    }

    getUser();
  }, []);

  if (!myUser) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator size={48} color='#000' />
      </View>
    )
  }

  return (
    <View>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      <FlatList
        keyExtractor={(conversation) => conversation.user_id_db_id}
        data={conversations}
        renderItem={({ item }) =>
          <ChatItem
            data={item}
            navigation={navigation}
          />
        }
      />

      <FlatList />
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});

export default Chats;
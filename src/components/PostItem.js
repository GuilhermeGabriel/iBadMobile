import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const PostItem = ({ data, navigation }) => {
  const [heart, setHeart] = useState('hearto');

  async function handlePress(type) {
    if (type === 'send') {
      navigation.navigate('Chat', { user_id_db_id: data.user_id_db_id });
    }

    if (type === 'heart') {
      if (heart === 'hearto') {
        setHeart('heart')
      } else {
        setHeart('hearto')
      }

      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      api.post('/posts/like', {
        google_id: user.id,
        postId: data._id
      });
    }
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.titles}>
        <Text style={styles.title}>iBad</Text>
        <Text style={styles.type}>{data.type}</Text>
      </View>
      <Text style={styles.body}>{data.body}</Text>
      <View style={styles.actionsContainer}>
        <Text style={styles.user}>@{data.username}</Text>
        <Feather style={styles.actionItem} onPress={() => handlePress('send')} name='send' color='#fff' size={24}></Feather>
        <AntDesign style={styles.actionItem} onPress={() => handlePress('heart')} name={heart} color='#fff' size={24}></AntDesign>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 2,
    backgroundColor: '#000',
    height: 240
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
  },
  type: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    color: '#fff',
  },
  body: {
    paddingBottom: 16,
    flex: 1,
    textAlignVertical: "center",
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
  },
  user: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 12
  },
  actionItem: {
    paddingLeft: 16,
  }
})

export default PostItem;

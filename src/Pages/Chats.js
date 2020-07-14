import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import ChatItem from '../components/ChatItem';

const Chats = ({ navigation }) => {
  return (
    <View>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      <ChatItem navigation={navigation} />
      <ChatItem navigation={navigation} />
      <ChatItem navigation={navigation} />
      <ChatItem navigation={navigation} />
      <ChatItem navigation={navigation} />
      <ChatItem navigation={navigation} />

      <FlatList />
    </View>
  );
}

const styles = StyleSheet.create({
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
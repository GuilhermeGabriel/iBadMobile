import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const ChatItem = ({ navigation, data }) => {
  useState(() => {
    console.log(data)
  }, []);

  return (
    <>
      <RectButton
        onPress={() => navigation.navigate('Chat', {
          user_id_db_id: data.user_id_db_id,
          user_google_id: data.user_google_id,
          username: data.username
        })}
        rippleColor='#ccc'
        style={styles.container}>
        <View style={styles.nameMessageContainer}>
          <Text style={styles.name}>@Fulano</Text>
          <Text style={styles.message}>Eu gosto disso hahaha</Text>
        </View>
        <View style={styles.alert} />
      </RectButton>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  nameMessageContainer: {
    flexDirection: 'column'
  },
  name: {
    fontSize: 17,
    fontFamily: 'Roboto_700Bold'
  },
  message: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular'
  },
  alert: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#000',
    marginRight: 8,
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    marginHorizontal: 16
  }
});

export default ChatItem;
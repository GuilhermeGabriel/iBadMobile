import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PostItem = ({ body, user }) => {
  return (
    <View
      style={styles.container}
      rippleColor={'#fff'}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>iBad</Text>
      <Text style={styles.body}>{body}</Text>
      <View style={styles.actionsContainer}>
        <Text style={styles.user}>{user}</Text>
        <Feather style={styles.actionItem} name='send' color='#fff' size={24}></Feather>

        <Feather style={styles.actionItem} name='heart' color='#fff' size={24}></Feather>

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
  title: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
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
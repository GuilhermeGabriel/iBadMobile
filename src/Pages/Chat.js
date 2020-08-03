import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Chat = () => {
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
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const Pages = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>iBad</Text>
      <Text style={styles.description}>Encontre pessoas com a mesma tristeza que você</Text>
      <RectButton
        onPress={() => navigation.navigate('Home')}
        rippleColor='#fff'
        style={styles.button}>
        <Feather name='chevron-right' color='#fff' size={24} />
        <Text style={styles.buttontext}>ENTRAR</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  title: {
    fontSize: 48,
    fontFamily: 'Roboto_700Bold',
    marginLeft: 42,
    marginTop: 64
  },
  description: {
    width: 251,
    fontSize: 36,
    fontFamily: 'Roboto_400Regular',
    marginLeft: 42,
    marginTop: 64
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 42,
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#000'
  },
  buttontext: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Pages;
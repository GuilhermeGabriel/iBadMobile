import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

import api from '../services/api';

const AddPost = ({ navigation }) => {
  const [body, setBody] = useState('');
  const [type, setType] = useState('desabafo');

  async function onSubmit(type) {
    if (body === '') {
      return alert('Você não pode postar um conteúdo vazio!');
    }

    await api.post('posts', {
      user: 'aa',
      body,
      type,
      color: '#000'
    });

    ToastAndroid.show('Postando...', ToastAndroid.SHORT);
    navigation.goBack();
  }

  return (
    <>
      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>iBad</Text>
        <View style={styles.rightContainer}>
          <Picker
            selectedValue={type}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              setType(itemValue);
            }
            }>
            <Picker.Item label="Desabafo" value="desabafo" />
            <Picker.Item label="Conselhos" value="conselhos" />
            <Picker.Item label="Amor" value="amor" />
            <Picker.Item label="Dinheiro" value="dinheiro" />
            <Picker.Item label="Saúde" value="saude" />
            <Picker.Item label="Amizade" value="amizade" />
            <Picker.Item label="Espiritualidade" value="espiritualidade" />
            <Picker.Item label="Trabalho" value="trabalho" />
            <Picker.Item label="Diversão" value="diversão" />
            <Picker.Item label="Sexualidade" value="sexualidade" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>
          <RectButton
            style={styles.icon}
            rippleColor="#ccc"
            onPress={() => onSubmit(type)}>
            <Feather name='send' size={20} />
          </RectButton>
        </View>
      </View>

      <View style={styles.container}>
        <TextInput
          onChangeText={txt => setBody(txt)}
          style={styles.input}
          placeholder='Digite aqui...'
          multiline={true}
          maxLength={120} />
      </View>
    </>
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
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    paddingHorizontal: 16
  },
  input: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
    backgroundColor: '#000',
    textAlign: 'center',
    padding: 16,
    lineHeight: 50,
  }
})

export default AddPost;
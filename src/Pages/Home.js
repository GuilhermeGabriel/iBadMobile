import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, FlatList, StyleSheet, ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

import api from '../services/api';
import Auth from '../services/signin';
import PostItem from '../components/PostItem';

const Home = ({ navigation }) => {
  const [type, setType] = useState('todos');
  const [posts, setPosts] = useState([]);
  const [lasPostDate, setLastPostDate] = useState('');

  async function getData() {
    const values = await api.get('posts', {
      params: {
        type,
        lastDateRaw: lasPostDate
      }
    });

    if (values.data.length > 0) {
      setPosts([...posts, ...values.data]);
      setLastPostDate(values.data[values.data.length - 1].createdAt);
    }
  }

  useEffect(() => {
    setPosts([]);
    setLastPostDate('');
    getData();
  }, [type])

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor='#000'
        translucent={false}
        barStyle='light-content' />

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
            <Picker.Item label="Todos" value="todos" />
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
            onPress={() => navigation.navigate('Chats')}>
            <Feather name='send' size={20} />
          </RectButton>
        </View>
      </View>

      {
        posts.length !== 0 ?
          <FlatList
            data={posts}
            onEndReached={() => getData()}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) =>
              <PostItem
                data={item}
                navigation={navigation}
              />
            }
            keyExtractor={item => item._id}
          />
          :
          <ActivityIndicator
            style={{ transform: [{ translateY: Dimensions.get('window').height / 2 }] }}
            size={54}
            color="#000" />
      }
      <RectButton
        style={styles.addPost}
        rippleColor='#000'
        onPress={async () => {

          const isLogged = await Auth.isLogged();

          if (!isLogged) {
            ToastAndroid.show('Fazendo login...', ToastAndroid.SHORT);
            const user = await Auth.signInWithGoogleAsync();
            if (user) navigation.navigate('AddPost');
          } else {
            navigation.navigate('AddPost');
          }
        }}>
        <Feather name='plus' color='#000' size={25} />
      </RectButton>
    </View >
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
  addPost: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height - 60,
    transform: [
      { translateX: -24 }
    ],
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 16,
    backgroundColor: '#fff',
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default Home;
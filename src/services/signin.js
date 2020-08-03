import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const Auth = {
  async signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: `353879802020-s11anb8t84keglels7fc7p8pjd5a2e2n.apps.googleusercontent.com`,
        iosClientId: `353879802020-he47la7sia0nh8rbi32hkqf19ndgqobi.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userFromApi = await api.post('users', {
          google_id: result.user.id,
          name: result.user.name
        });

        const { _id } = userFromApi.data;

        const userWithDBid = {
          ...result.user,
          _id
        }

        const userString = JSON.stringify(userWithDBid);
        await AsyncStorage.setItem('@user', userString);

        return userWithDBid;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  async isLogged() {
    let userString = await AsyncStorage.getItem('@user');
    const user = JSON.parse(userString);
    return user;
  }
}

export default Auth;
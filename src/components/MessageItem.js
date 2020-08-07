import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const MessageItem = ({ data, position }) => {
  return (
    <View style={(position === 'left') ? styleLeft.container : styleRight.container}>
      <Text style={styles.message}>{data.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerIndicator: {
    flex: 1
  },
  message: {
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'Roboto_400Regular',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 8
  }
})

const styleRight = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 16,
    justifyContent: 'flex-end'
  },
});

const styleLeft = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 16,
    justifyContent: 'flex-start'
  }
});

export default MessageItem;
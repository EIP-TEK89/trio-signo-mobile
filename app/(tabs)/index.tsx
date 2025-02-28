import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native';
import SignIn from '@/components/Signin';
import 'expo-router/entry';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SignIn />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    backgroundColor: 'purple',
    color: 'white',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },

});


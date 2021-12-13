import React from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './components/Game'

export default function App() {
  return (
    <View style={styles.container}>
      <Game randomNumberCount={6} initialSeconds={10}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 50
  },
});

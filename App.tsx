
import React, { useState, createContext } from 'react';
import { StyleSheet,  View } from 'react-native';
import {  NativeRouter, Route } from 'react-router-native';
import { Home } from './src/components/Home';
import { Main } from './src/components/Main';

export const Context = createContext({});

function App() {
  const [user, setUser] = useState({});

  const obj= {
    user,
    setUser
  };

  return (
    <Context.Provider value={obj}>
      <NativeRouter>
        <View style={styles.container}>
          <Route path="/" exact component={Home}/>
          <Route path="/main"  component={Main}/>
        </View>
      </NativeRouter>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

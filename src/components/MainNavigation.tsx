import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Prop } from '../interfaces/Interfaces';

export const MainNavigation: React.FC<Prop> = ({ onPage }) => (
  <View
    style={styles.navContainer}
  >
    <View
      style={styles.box}
    >
      <Text
        style={styles.text}
        onPress={() => onPage('main')}
      >
        Feeds
      </Text>
    </View>
    <View
      style={styles.box}
    >
      <Text
        style={styles.text}
        onPress={() => onPage('person')}
      >
        Profile
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  navContainer: {
    marginTop: '11%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5
  },

  box: {
    width: '50%'
  },

  text: {
    color: '#76e3e3',
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
  }
});

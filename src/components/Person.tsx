import React, { useContext } from "react";
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Context } from '../../App';
import { Prop } from "../interfaces/Interfaces";

export const Person: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useContext<Prop>(Context);

  const logOut = () => {
    history.push('/');
    setUser({});
  };

  return(
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.photo}
          source={{
            uri: user.avatar,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Name: {user.first_name}</Text>
        </View>
      </View>
      <Button title="Logout" onPress={() => logOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '94%',
    justifyContent: 'space-between',
    padding: 10,
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderColor: '#2F4F4F'

  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#30686e'
  },

  photo: {
    height: 70,
    width: 70,
    borderRadius: 50
  },

  info: {
    paddingLeft: 20
  },

  text: {
    color: '#76e3e3',
    fontSize: 16
  }
});

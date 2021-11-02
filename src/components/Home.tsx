import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Form } from '../interfaces/Interfaces';
import { useHistory } from 'react-router-native';
import { getUsers } from '../api/getData';
import { Context } from '../../App';
import { User, Prop } from '../interfaces/Interfaces';

const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const debounse = (f: Function) => {
  let time: number;

  return (args: string) => {
    clearTimeout(time);
    time = setTimeout(f, 1000, args);
  };
};

export const Home: React.FC = () => {
  const [value, setValue] = useState<Form>({
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string[]>([]);
  const [str, setStr] = useState('');
  const [findedUser, setFindedUser] = useState<Prop>({})
  const { setUser } = useContext<Prop>(Context);

  useEffect(() => {
    getUsers()
    .then(setUsers);
  }, []);

  const query = useCallback(debounse(setStr), []);

  const history = useHistory();

  const handleChange = (value: string, key: string) => {
    setValue(prev => ({...prev, [key]: value}));

    if (key === 'email') {
      query(value);
    }
  };

  const handleDelete = (name: string) => {
    setError(prev => prev.filter(er => er !== name));
  };

  const addError = (value: string) => {
    setError(prev => [...prev, value]);
  };

  const handleBlur = (value: string, name: string) => {

    switch(name) {
      case 'email':
        if (!findedUser.email || !(reg.test(value))) {
          addError(name);
        } else {
          handleDelete(name);
        };

        return;

      case 'password': 
        if (value.trim().length < 8) {
          addError( name);
        } else {
          handleDelete(name);
        }

      return;
    };
  };

  useEffect(() => {
      const user = users.find((user: User) => user.email === str);
     
      if (user) {
        setFindedUser(user);
      };
  
  }, [str]);

  const checkValid = () => {
    if (!value.email.trim()) {
      addError('email');
    };

    if (!value.password.trim()) {
      addError('password');
    };
  };

  const handleSubmit = () => {
    checkValid();

    if (findedUser.email && !error.length) {
      history.push('/main');
      setUser(findedUser);
    };
  };

  return(
    <View 
      style={styles.inputContainer}
    >
      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          value={value.email}
          placeholder="Email"
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={"email-address"}
          placeholderTextColor="#808080"
          onBlur={() => handleBlur(value.email, 'email')}
          onChangeText={(e) => handleChange(e, 'email')}
        />
        {error.includes('email') && <Text style={styles.message}>Email is not valid </Text>}
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          value={value.password}
          placeholder="Password"
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={true}
          placeholderTextColor="#808080"
          onBlur={() => handleBlur(value.password, 'password')}
          onChangeText={(e) => handleChange(e, 'password')}
        />
        {error.includes('password') && <Text style={styles.message}>Password length min 8 chars</Text>}
      </View>
      <Button
        title="Login"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  inputBlock: {
    position: 'relative',
    marginBottom: 15,
  },

  message: {
    position: 'absolute',
    color: 'red',
    bottom: -11,
    left: 4
  },

  input: {
    padding: 5,
    fontSize: 20,
    color: '#DCDCDC',
  }
});

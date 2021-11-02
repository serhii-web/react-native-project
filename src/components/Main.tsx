import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { MainNavigation } from "./MainNavigation";
import { ImagePage } from "./ImagePage";
import { Person } from './Person';

export const Main: React.FC = () => {
  const [page, setPage] = useState<string>('main');

  return(
    <View style={styles.mainBlock}>
      <MainNavigation onPage={setPage} />
      <View>
      {page === 'main' 
        ? <ImagePage /> 
        : <Person />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    height: '100%',
  },
})
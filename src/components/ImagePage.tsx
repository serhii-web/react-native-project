import React, { useEffect, useState } from "react";
import { View,  FlatList, StyleSheet} from 'react-native';
import { getPicture } from "../api/getData";
import { PictureType } from "../interfaces/Interfaces";
import { Image } from './Image';

export const ImagePage: React.FC = () => {
  const [pictures, setPictures] = useState<Array<PictureType>>([]);
  const [picturesFor, setPicturesFor] = useState<Array<PictureType>>([]);
  const [page, setPage] = useState(1);;

  useEffect(() => {
    getPicture(page)
      .then(setPictures)
  }, [page]);

  useEffect(() => {
    addImages()
  }, [pictures]);

  const addImages = () => {
    setPicturesFor(prev => [...prev, ...pictures])
  };

  const addPage = () => {
    setPage(prev => prev + 1)
  }

  return(
    <View style={styles.images}>
      <FlatList
        data={picturesFor}
        renderItem={({item}) => <Image {...item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={addPage}
        onEndReachedThreshold={10} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    paddingTop: 10,
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderTopColor: "#2F4F4F"
  }
});

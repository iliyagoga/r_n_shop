import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import MenuComponent from '../components/MenuComponent';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <>
      <MenuComponent />
    </>
  );
};

export default Home;

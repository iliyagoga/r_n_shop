import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import MenuComponent from '../components/MenuComponent';
import { observer } from 'mobx-react-lite';
import Store from '../utils/stores/Store';
import MusicComponent from '../components/MusicConponent';

const Home = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <>
      <MenuComponent />
            {Store.sound ? <MusicComponent/>:""}
    </>
  );
});

export default Home;

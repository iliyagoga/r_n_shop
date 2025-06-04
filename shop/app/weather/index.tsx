import React from 'react-native';
import MenuComponent from '../../components/MenuComponent';
import { Button, Container, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import API from '../../utils/API';
import { useNavigation } from 'expo-router';
import MusicComponent from '../../components/MusicConponent';
import Store from '../../utils/stores/Store';
const WeatherContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ebfff5;
  height: 100vh;
  gap: 20px;
`;
const Input = styled(TextField)``;
const ButtonWeather = styled(Button)`
  border-radius: 20px;
  padding: 10px 30px;
  color: black;
  background: lightgreen;
`;
const Weather = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);
  const [notfound, setNotfound] = useState<boolean>(false);
  return (
    <>
      <MenuComponent />
      <WeatherContainer>
        <Input
          placeholder="Тут напишите город :)"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></Input>
        <ButtonWeather
          onClick={() => {
            API.getWeather(city)
              .then((res) => {
                setWeather(res);
                setNotfound(false);
              })
              .catch((e) => {
                setNotfound(true);
                setWeather(false);
              });
          }}
        >
          <Typography>Поиск...</Typography>
        </ButtonWeather>
        {weather ? (
          <>
            <Typography>
              Погода: {weather['weather'][0]['description']}
            </Typography>
            <Typography>
              Ощущается как {Math.round(weather['main']['feels_like'])} °C
            </Typography>
            <Typography>
              Температура: {Math.round(weather['main']['temp'])}°C
            </Typography>
            <Typography>Влажность: {weather['main']['humidity']}</Typography>
            <Typography>Ветер: {weather['wind']['speed']} м.с.</Typography>
          </>
        ) : (
          ''
        )}
        {notfound ? <Typography>Город не найден</Typography> : ''}
      </WeatherContainer>
    </>
  );
};

export default Weather;

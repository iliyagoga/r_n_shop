import React from 'react-native';
import MenuComponent from '../../components/MenuComponent';
import { Button, Container, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import API from '../../utils/API';
import { useNavigation } from 'expo-router';
const WeatherContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
const Input = styled(TextField)``;
const ButtonWeather = styled(Button)`
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px 15px;
  width: max-content;
  box-sizing: border-box;
  text-align: center;
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
          placeholder="Введите город"
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
          <Typography>Узнать</Typography>
        </ButtonWeather>
        {weather ? (
          <>
            {' '}
            <Typography>
              Температура: {Math.round(weather['main']['temp'])}°C
            </Typography>
            <Typography>
              Ощущается как {Math.round(weather['main']['feels_like'])} °C
            </Typography>
            <Typography>
              Погода: {weather['weather'][0]['description']}
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

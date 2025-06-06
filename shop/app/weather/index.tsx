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
  background: #fff;
  min-height: 100vh;
  padding: 20px;
`;

const Input = styled(TextField)`
  width: 100%;
  max-width: 450px;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
    background: #f5f5f5;
  }
`;

const ButtonWeather = styled(Button)`
  padding: 12px;
  width: 100%;
  max-width: 450px;
  background: #517da2;
  color: white;
  text-transform: none;
  border-radius: 8px;
  margin: 16px 0;
  
  &:hover {
    background: #426c91;
  }
`;

const WeatherInfo = styled.div`
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const WeatherText = styled(Typography)`
  color: #000;
  font-size: 14px;
  margin: 8px 0;
`;

const ErrorText = styled(Typography)`
  color: #d32f2f;
  font-size: 14px;
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
          placeholder="Введите название города"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
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
          Найти
        </ButtonWeather>

        {weather && (
          <WeatherInfo>
            <WeatherText>
              Погода: {weather['weather'][0]['description']}
            </WeatherText>
            <WeatherText>
              Ощущается как {Math.round(weather['main']['feels_like'])} °C
            </WeatherText>
            <WeatherText>
              Температура: {Math.round(weather['main']['temp'])}°C
            </WeatherText>
            <WeatherText>
              Влажность: {weather['main']['humidity']}%
            </WeatherText>
            <WeatherText>
              Ветер: {weather['wind']['speed']} м/с
            </WeatherText>
          </WeatherInfo>
        )}

        {notfound && <ErrorText>Город не найден</ErrorText>}
      </WeatherContainer>
    </>
  );
};

export default Weather;

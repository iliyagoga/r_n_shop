import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Alert, Container, TextField, Typography } from '@mui/material';
import { validatorLogin } from '../../utils/validator';
import API from '../../utils/API';
import { router, useNavigation } from 'expo-router';
const RegistrationContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
`;
const Input = styled(TextField)``;
const Title = styled(Typography)`
  text-align: center;
  font-size: 1, 5rem;
  font-weight: 700;
`;
const RegBlock = styled(Container)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: relative;
  padding: 0;
`;
const RegButton = styled.div`
cursor: pointer;
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;
const Login = () => {
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errors, setErrors] = useState<object>({});
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [error, setError]=useState<string | null>(null)
  return (
    <>
    {error? <Alert severity="error">{error}</Alert>:""}
      <RegistrationContainer>
        <Title>Авторизация</Title>
        <Input
          error={errors && errors['login'] ? true : false}
          helperText={errors && errors['login'] ? errors['login'] : ''}
          placeholder="Логин"
          style={errors && errors['login'] && { color: 'rgb(211, 47, 47)' }}
          required
          sx={
            errors &&
            errors['login'] && {
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(211, 47, 47)',
                opacity: 1,
              },
            }
          }
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          error={errors && errors['pass'] ? true : false}
          helperText={errors && errors['pass'] ? errors['pass'] : ''}
          placeholder="Пароль"
          style={errors && errors['pass'] && { color: 'rgb(211, 47, 47)' }}
          required
          sx={
            errors &&
            errors['pass'] && {
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(211, 47, 47)',
                opacity: 1,
              },
            }
          }
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        <RegButton
          onClick={(e) => {
            setErrors(validatorLogin(login, pass));
            if (Object.keys(errors).length == 0) API.loginApi(login, pass).then().catch(e=>{setError("Неправильные логин или пароль")});
          }}
        >
          <Typography>Войти</Typography>
        </RegButton>
         <RegButton
          onClick={(e) => {
            router.push("/auth/registration")
          }}
        >
          <Typography>Перейти в регистрацию</Typography>
        </RegButton>
      </RegistrationContainer>
    </>
  );
};

export default Login;

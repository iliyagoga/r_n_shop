import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Alert, Container, TextField, Typography } from '@mui/material';
import { validatorLogin } from '../../utils/validator';
import API from '../../utils/API';
import { router, useNavigation } from 'expo-router';

const RegistrationContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 100vh;
  gap: 20px;
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

const Title = styled(Typography)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-bottom: 20px;
`;

const RegButton = styled.div`
  cursor: pointer;
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  max-width: 450px;
  box-sizing: border-box;
  text-align: center;
  background: #517da2;
  color: white;
  transition: background 0.2s;

  &:hover {
    background: #426c91;
  }
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
          <Typography style={{color: 'white'}}>Войти</Typography>
        </RegButton>
         <RegButton
          onClick={(e) => {
            router.push("/auth/registration")
          }}
          style={{background: '#f5f5f5', color: '#517da2'}}
        >
          <Typography style={{color: '#517da2'}}>Перейти в регистрацию</Typography>
        </RegButton>
      </RegistrationContainer>
    </>
  );
};

export default Login;

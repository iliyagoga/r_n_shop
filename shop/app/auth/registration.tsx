import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Alert, Container, TextField, Typography } from '@mui/material';
import { validator } from '../../utils/validator';
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

const RegBlock = styled(Container)`
  display: flex;
  flex-direction: row;
  gap: 12px;
  position: relative;
  padding: 0;
  width: 100%;
  max-width: 450px;
`;

const FileInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
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

const Reg = () => {
  const [name, setName] = useState<string>('');
  const [family, setFamily] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [repass, setRepass] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>();
  const [errors, setErrors] = useState<object>({});
  const navigation = useNavigation();
  const [error, setError]=useState<string | null>(null)

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      {error? <Alert severity="error">{error}</Alert>:""}
      <RegistrationContainer>
        <Title>Регистрация</Title>
        <Input
          error={errors && errors['name'] ? true : false}
          helperText={errors && errors['name'] ? errors['name'] : ''}
          placeholder="Имя"
          style={errors && errors['name'] && { color: 'rgb(211, 47, 47)' }}
          required
          sx={
            errors &&
            errors['name'] && {
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(211, 47, 47)',
                opacity: 1,
              },
            }
          }
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          error={errors && errors['family'] ? true : false}
          helperText={errors && errors['family'] ? errors['name'] : ''}
          placeholder="Фамилия"
          style={errors && errors['family'] && { color: 'rgb(211, 47, 47)' }}
          required
          sx={
            errors &&
            errors['family'] && {
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(211, 47, 47)',
                opacity: 1,
              },
            }
          }
          value={family}
          onChange={(e) => {
            setFamily(e.target.value);
          }}
        />
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
        <Input
          error={errors && errors['repass'] ? true : false}
          helperText={errors && errors['repass'] ? errors['repass'] : ''}
          placeholder="Повтор пароля"
          style={errors && errors['repass'] && { color: 'rgb(211, 47, 47)' }}
          required
          sx={
            errors &&
            errors['repass'] && {
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(211, 47, 47)',
                opacity: 1,
              },
            }
          }
          type="password"
          value={repass}
          onChange={(e) => {
            setRepass(e.target.value);
          }}
        />
        <RegBlock>
          <RegButton>
            <Typography style={{color: 'white'}}>Загрузить аватар</Typography>
          </RegButton>
          <FileInput
            type="file"
            onChange={(e) => {
              setAvatar(e.target.files && e.target.files[0]);
            }}
          />
        </RegBlock>
        <RegButton
          onClick={(e) => {
            setErrors(validator(name, family, login, pass, repass, avatar));
            if (Object.keys(errors).length == 0)
              API.regApi(name, family, login, pass, repass, avatar).then().catch(e=>{setError("Такой пользователь уже существует")});
          }}
        >
          <Typography style={{color: 'white'}}>Зарегистрироваться</Typography>
        </RegButton>
        <RegButton
          onClick={(e) => {
            router.push("/auth/login")
          }}
        >
          <Typography style={{color: 'white'}}>Перейти в авторизацию</Typography>
        </RegButton>
      </RegistrationContainer>
    </>
  );
};

export default Reg;

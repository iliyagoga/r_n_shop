import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Container, TextField, Typography } from '@mui/material';
import { validator } from '../../utils/validator';
import API from '../../utils/API';
import { router, useNavigation } from 'expo-router';
const RegistrationContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
  overflow-y: scroll;
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
const FileInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
`;
const RegButton = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
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

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <>
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
            <Typography>Загрузить аватар</Typography>
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
              API.regApi(name, family, login, pass, repass, avatar);
          }}
        >
          <Typography>Зарегистрироваться</Typography>
        </RegButton>
      </RegistrationContainer>
    </>
  );
};

export default Reg;

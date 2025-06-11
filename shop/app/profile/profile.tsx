import { Button, Paper, TextField, Typography } from '@mui/material';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import React from 'react-native';
import styled from 'styled-components';
import MenuComponent from '../../components/MenuComponent';
import * as Image from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../../assets/images/avatar.jpg';
import { observer } from 'mobx-react-lite';
import Store from '../../utils/stores/Store';
import API from '../../utils/API';
import MusicComponent from '../../components/MusicConponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from 'expo-router/build/global-state/router-store';

const ProfileContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
  padding: 0 15px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
  max-width: 450px;
  padding: 0 16px;
`;

const Text = styled(Typography)`
  color: #000;
  font-size: 14px;
`;

const ProfileHeader = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

const ProfileButton = styled(Button)`
  padding: 12px;
  width: 100%;
  background: #517da2;
  color: white;
  text-transform: none;
  border-radius: 8px;
  
  &:hover {
    background: #426c91;
  }
`;

const Input = styled(TextField)`
  width: 100%;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
    background: #f5f5f5;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 32px;
`;


const ImageLoad = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;

const Profile = observer(() => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [redact, setRedact] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [family, setFamily] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [avatar, setAvatar] = useState<any>('');
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (Object.keys(Store.user).length == 0) {
        router.push('/');
      }
    }
  }, [isReady]);
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <MenuComponent />
      <ProfileContainer>
        <ImageContainer>
          <Image.Image
            style={{width: 120, height: 120, borderRadius: 60}}
            source={
              avatar && avatar.length > 0
                ? avatar
                : Store.user['avatar']
                  ? Store.user['avatar']
                  : Avatar
            }
          />
          {redact && (
            <ImageLoad
              accept=".jpg,.png"
              onChange={(e) => {
                if (e.target.files) {
                  const reader = new FileReader();
                  reader.onload = function (event) {
                    setAvatar(event.target ? event.target.result : '');
                  };
                  reader.readAsDataURL(e.target.files[0]);
                  setFile(e.target.files[0]);
                }
              }}
              type="file"
            />
          )}
        </ImageContainer>

        {redact ? (
          <Block>
            <Input
              placeholder="Логин"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <Input
              placeholder="Имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              placeholder="Фамилия"
              value={family}
              onChange={(e) => {
                setFamily(e.target.value);
              }}
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Block>
        ) : (
          <Block>
            <ProfileHeader>{Store.user['name'] + ' ' + Store.user['family']}</ProfileHeader>
            <Text style={{color: '#517da2'}}>@{Store.user['login']}</Text>
            <Text style={{color: '#666'}}>{Store.user['date'] ?? 'Укажите дату рождения'}</Text>
          </Block>
        )}

        <Block>
          <ProfileButton
            onClick={() => {
              if (redact) {
                setName('');
                setFamily('');
                setLogin('');
                setDate('');
                setAvatar('');
                setFile(null);
              } else {
                setName(Store.user['name']);
                setFamily(Store.user['family']);
                setDate(Store.user['date'] ?? null);
                setLogin(Store.user['login']);
              }
              setRedact(!redact);
            }}
          >
            {!redact ? 'Редактировать' : 'Отмена'}
          </ProfileButton>

          {redact && (
            <ProfileButton
              onClick={() => {
                API.changeUser(
                  Store.user['id'],
                  name,
                  family,
                  login,
                  date,
                  file
                ).then(() => {
                 API.checkUser().then((r) => {
                    Store.setUser(r);
                    setRedact(false);
                  });
                });
              }}
            >
              Сохранить
            </ProfileButton>
          )}

          <ProfileButton
            onClick={() => {
              AsyncStorage.setItem('token', "")
              Store.sound?.track.stopAsync()
              Store.setSound(null)
              router.push('/')
            }}
            style={{background: '#dc3545'}}
          >
            Выйти
          </ProfileButton>
        </Block>
      </ProfileContainer>
    </>
  );
});

export default Profile;

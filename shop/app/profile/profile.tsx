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
  justify-content: center;
  background: #ebfff5;
  height: 100vh;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  width: 50%;
`;

const Text = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: black;

`;
const ProfileButton = styled(Button)`
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  background: lightgreen;
`;
const Input = styled(TextField)`
width: 100%;`;
const ImageContainer = styled.div`
  position: relative;
`;
const ImageLoad = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
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
        <Block>
          <ImageContainer>
            <Image.Image
              source={
                avatar && avatar.length > 0
                  ? avatar
                  : Store.user['avatar']
                    ? Store.user['avatar']
                    : Avatar
              }
              style={{ width: 100, height: 100 }}
            />
            {redact ? (
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
            ) : (
              ''
            )}
          </ImageContainer>
        </Block>
            {redact ? (
              <Block>
                    <Input
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
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
                <Text>{Store.user['name'] + ' ' + Store.user['family']}</Text>
                      <Text>@{Store.user['login']}</Text>
                          <Text>{Store.user['date'] ?? 'Укажите дату рождения'}</Text>
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
            <Text>{!redact ? 'Редактировать' : 'Отмена'}</Text>
          </ProfileButton>
          {redact ? (
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
              <Text>Сохранить</Text>
            </ProfileButton>
          ) : (
            ''
          )}
           <ProfileButton
              onClick={() => {
           
                  AsyncStorage.setItem('token',"")
                  Store.sound?.track.stopAsync()
                  Store.setSound(null)
                  router.push('/')
              
              }}
            >
              <Text>Выйти</Text>
            </ProfileButton>
        </Block>
      </ProfileContainer>
    </>
  );
});
export default Profile;

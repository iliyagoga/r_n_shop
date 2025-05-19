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
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Block = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const BlockVertical = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
`;
const Text = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  color: black;
`;
const ProfileButton = styled(Button)`
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;
`;
const Input = styled(TextField)``;
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
      {Store.sound ? <MusicComponent/>:""}
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

          <BlockVertical>
            {redact ? (
              <Block>
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
              </Block>
            ) : (
              <Text>{Store.user['name'] + ' ' + Store.user['family']}</Text>
            )}

            {redact ? (
              <Input
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
            ) : (
              <Text>@{Store.user['login']}</Text>
            )}
            {redact ? (
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            ) : (
              <Text>{Store.user['date'] ?? 'Укажите дату рождения'}</Text>
            )}
          </BlockVertical>
        </Block>
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

import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import React from 'react-native';
import * as Image from 'expo-image';
import { useState } from 'react';
import { router } from 'expo-router';
import API from '../utils/API';
import { observer } from 'mobx-react-lite';
import Store from '../utils/stores/Store';

const MeanMenu = styled(Paper)`
  padding: 12px 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: row;
  background: #517da2;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const MenuItem = styled(Button)`
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  background: transparent;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const MenuComponent = observer(() => {
  return (
    <MeanMenu>
      <MenuItem
        onClick={() => {
          API.checkUser()
            .then((res) => {
              Store.setUser(res);
              router.push('/profile/profile');
            })
            .catch(() => {
              router.push('/auth/login');
            });
        }}
      >
        Профиль
      </MenuItem>
      <MenuItem
        onClick={() => {
          API.checkUser()
            .then((res) => {
              Store.setUser(res);
              router.push('/music');
            })
            .catch(() => {
              router.push('/auth/login');
            });
        }}
      >
        Музыка
      </MenuItem>
      <MenuItem
        onClick={() => {
          API.checkUser()
            .then((res) => {
              Store.setUser(res);
              router.push('/weather');
            })
            .catch(() => {
              router.push('/auth/login');
            });
        }}
      >
        Погода
      </MenuItem>
      <MenuItem
        onClick={() => {
          API.checkUser()
            .then((res) => {
              Store.setUser(res);
              router.push('/chats');
            })
            .catch(() => {
              router.push('/auth/login');
            });
        }}
      >
        Чат
      </MenuItem>
    </MeanMenu>
  );
});

export default MenuComponent;

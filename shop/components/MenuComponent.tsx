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
  padding: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: row;
`;
const MenuItem = styled(Button)`
  padding: 2px 0;
  color: black;
  border-bottom: 1px solid black;
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
      <MenuItem>Музыка</MenuItem>
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
    </MeanMenu>
  );
});

export default MenuComponent;

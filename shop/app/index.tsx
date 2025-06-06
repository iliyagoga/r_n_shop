import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import MenuComponent from '../components/MenuComponent';
import { observer } from 'mobx-react-lite';
import Store from '../utils/stores/Store';
import MusicComponent from '../components/MusicConponent';
import { Container, Typography } from '@mui/material';
import styled from 'styled-components';

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  min-height: 100vh;
  padding: 0 20px;
`;

const WelcomeText = styled(Typography)`
  color: #517da2;
  font-size: 24px;
  font-weight: 500;
  margin: 32px 0;
  text-align: center;
`;

const ContentBlock = styled.div`
  width: 100%;
  max-width: 450px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const ContentText = styled(Typography)`
  color: #000;
  font-size: 14px;
  margin: 8px 0;
`;

const Home = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <MenuComponent />
      <MainContainer>

      <WelcomeText>
        Добро пожаловать в наше приложение
      </WelcomeText>
      
      <ContentBlock>
        <ContentText>
          Это ваше личное пространство, где вы можете:
        </ContentText>
        <ContentText>
          • Проверить прогноз погоды
        </ContentText>
        <ContentText>
          • Слушать любимую музыку
        </ContentText>
        <ContentText>
          • Управлять своим профилем
        </ContentText>
        <ContentText>
          • Переписываться с друзьями!
        </ContentText>
      </ContentBlock>
    </MainContainer>
    </>
  );
});

export default Home;

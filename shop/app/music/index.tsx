import { useEffect, useState } from 'react';
import { listMusic, playSound } from '../../assets/other';
import { Button, Card, Container, Typography } from '@mui/material';
import { Sound } from 'expo-av/build/Audio';
import { useNavigation } from 'expo-router';
import styled from 'styled-components';
import MenuComponent from '../../components/MenuComponent';
import { Audio } from 'expo-av';
import Store from '../../utils/stores/Store';
import { observer } from 'mobx-react-lite';
import React from 'react';

const MusicContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 100vh;
  padding: 20px;
`;

const MusicElement = styled(Card)`
  padding: 12px 16px;
  border-radius: 8px;
  background: #fff;
  border-bottom: 1px solid #e7e8ec;
  box-shadow: none;
  margin-bottom: 1px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const MusicButton = styled(Button)`
  min-width: 36px;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
  color: #2688eb;
  background: transparent;

  &:hover {
    background: rgba(38, 136, 235, 0.1);
  }
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TrackTitle = styled(Typography)`
  font-size: 14px;
  color: #000;
  font-weight: 400;
`;

type Mus = {
  name: string;
  track: Sound;
};

const Music = observer(() => {
  const navigation = useNavigation();
  const [list, setList] = useState<Mus[]>();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    listMusic().then((res) => {
      setList(res);
    });
  }, []);

  return (
    <>
      <div onClick={() => {
        if (Store.sound) {
          Store.sound.track.pauseAsync()
        }
      }}>
        <MenuComponent />
      </div>

      <MusicContainer>
        {list ? list.map((e: Mus) => {
          return (
            <MusicElement key={e.name}>
              <TrackInfo>
                <TrackTitle>{e.name}</TrackTitle>
                <Block>
                  <MusicButton
                    onClick={async () => {
                      if (Store.sound && Store.sound.name == e.name) {
                        Store.sound.track.playAsync()
                      } else {
                        if (Store.sound) {
                          Store.sound.track.stopAsync()
                        }
                        Store.setSound(e);
                        e.track.playAsync()
                      }
                    }}
                  >
                    ▶
                  </MusicButton>
                  <MusicButton
                    onClick={async () => {
                      if (Store.sound) {
                        Store.sound.track.stopAsync()
                      }
                    }}
                  >
                    ■
                  </MusicButton>
                  <MusicButton
                    onClick={async () => {
                      if (Store.sound) {
                        Store.sound.track.pauseAsync()
                      }
                    }}
                  >
                    ⏸
                  </MusicButton>
                </Block>
              </TrackInfo>
            </MusicElement>
          );
        }) : ''}
      </MusicContainer>
    </>
  );
});

export default Music;

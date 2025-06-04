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
const MusicContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ebfff5;
  height: 100vh;
  gap: 20px;
`;
const MusicElement = styled(Card)`
  padding: 10px;
  border-radius: 20px;
  background: #feffcf;
`;
const MusicButton = styled(Button)`
color: black;
font-weight: 700;`;
const Block = styled.div`
  display: flex;
  gap: 20px;
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
    <> <div onClick={()=>{
       if(Store.sound){
          Store.sound.track.pauseAsync()
        }
    }}>
      <MenuComponent></MenuComponent>
    </div>

      <MusicContainer>
        {list
          ? list.map((e: Mus) => {
              return (
                <MusicElement>
                  <Typography>{e.name}</Typography>
                  <Block>
                    {' '}
                    <MusicButton onClick={async()=>{
                        if(Store.sound && Store.sound==e){
                            Store.sound.track.playAsync()
                        }
                        else{if(Store.sound){
                            Store.sound.track.stopAsync()
                        }
                            Store.setSound(e); 
                            e.track.playAsync()
                        }
                      
                    }}>Play</MusicButton>
                       <MusicButton onClick={async()=>{
                        if(Store.sound){
                            Store.sound.track.stopAsync()
                        }

                    }}>Stop</MusicButton>
                    <MusicButton onClick={async()=>{
                        if(Store.sound){
                            Store.sound.track.pauseAsync()
                        }

                    }}>Pause</MusicButton>
                 
                  </Block>
                </MusicElement>
              );
            })
          : ''}
      </MusicContainer>
    </>
  );
});

export default Music;

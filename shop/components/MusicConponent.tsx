import { Button, Card, Typography } from "@mui/material";
import { Sound } from "expo-av/build/Audio";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Store from "../utils/stores/Store";
const MusicElement = styled(Card)`
  padding: 5px 10px;
  margin-top: 10px;
`;
const MusicButton = styled(Button)``;
const Block = styled.div`
  display: flex;
  gap: 20px;
`;
const MusicComponent = observer(()=>{
return <>
<MusicElement>
                  <Typography>{Store.sound && Store.sound.name}</Typography>
                  <Block>
                    {' '}
                    <MusicButton onClick={async()=>{
                        if(Store.sound){
                            Store.sound.track.playAsync()
                        }
                      
                    }}>Играть</MusicButton>
                    <MusicButton onClick={async()=>{
                        if(Store.sound){
                            Store.sound.track.pauseAsync()
                        }

                    }}>Пауза</MusicButton>
                    <MusicButton onClick={async()=>{
                        if(Store.sound){
                            Store.sound.track.stopAsync()
                        }

                    }}>Стоп</MusicButton>
                  </Block>
                </MusicElement>
</>
})
export default MusicComponent
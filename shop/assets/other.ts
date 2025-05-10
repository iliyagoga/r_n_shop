import music1 from '../assets/audio/moy-dvor-zdravstvuy-mama.mp3';
import music2 from '../assets/audio/pione_-_5x30_78817994.mp3';
import { Audio } from 'expo-av';
async function playSound(s: any) {
  const { sound } = await Audio.Sound.createAsync(
    { uri: s },
    { shouldPlay: false }
  );
  return sound;
}

const listMusic = async () => {
  return [
    { name: 'Здравствуй мама', track: await playSound(music1) },
    { name: '5x30', track: await playSound(music2) },
  ];
};
export { playSound, listMusic };

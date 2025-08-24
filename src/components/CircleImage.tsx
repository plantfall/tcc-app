import {Image} from 'react-native';
import {
  Especialista,
  imagens,
} from '../screens/ScreenAgendarConsulta/useAgendarConsulta';

type props = {
  especialista: Especialista;
  size: number;
};
export function CircleImage({especialista, size}: props) {
  return (
    <Image
      source={imagens[especialista.img]}
      style={{width: size, height: size, borderRadius: size / 2}}
    />
  );
}

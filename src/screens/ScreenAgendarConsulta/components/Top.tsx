import {Body} from '../../../ui/theme/components/typography';
import {CircleImage} from '../../../components/CircleImage';
import {Props} from './Props';
import {View} from 'react-native';
import {getEspecializacao} from '../ScreenAgendarConsulta';

export default function Top({especialista}: Props) {
  return (
    <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
      <CircleImage especialista={especialista} size={80} />

      <View>
        <Body weight="bold">{especialista.nome}</Body>
        <Body>{getEspecializacao(especialista.especializacao)}</Body>
      </View>
    </View>
  );
}

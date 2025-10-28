import {AppUtils} from '../../../utils/AppUtils';
import {Body} from '../../../ui/theme/components/typography';
import {CircleImage} from '../../../components/CircleImage';
import {Especialista} from '../../ScreenAgendarConsulta/useAgendarConsulta';
import {Theme} from '../../../ui/theme/types';
import {View} from 'react-native';
import {getEspecializacao} from '../../ScreenAgendarConsulta/ScreenAgendarConsulta';

type Props = {
  especialista: Especialista;
  theme: Theme;
};
export default function Top({especialista, theme}: Props) {
  return (
    <View
      style={{
        borderRadius: 10,
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        width: '100%',
      }}>
      <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
        <CircleImage especialista={especialista} size={50} />
        <View>
          <Body style={{fontSize: AppUtils.FontSizeMedium, fontWeight: '600'}}>
            {especialista.nome}
          </Body>
          <Body style={{fontSize: AppUtils.FontSize}}>
            {getEspecializacao(especialista.especializacao)}
          </Body>
        </View>
      </View>
    </View>
  );
}

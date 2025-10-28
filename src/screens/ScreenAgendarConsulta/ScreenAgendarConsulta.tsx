import ScreenConfimacaoHook, {Especializacao} from './useAgendarConsulta';

import Card from './components/Card';
import {View} from 'react-native';
import ViewThemed from '../../components/ViewThemed';
import Voltar from '../../components/Voltar';
import {useTheme} from '../../context/ThemeContext';

export default function ScreenAgendarConsulta() {
  const {especialistas, turnDatePickerOn} = ScreenConfimacaoHook();

  const {theme} = useTheme();

  return (
    <ViewThemed>
      <Voltar text="Agendar Consulta" />
      <View>
        {especialistas.map((v, index) => {
          return (
            <View key={index}>
              <Card especialista={v} turnDatePickerOn={turnDatePickerOn} />
              <View
                style={{
                  height: 5,
                  backgroundColor: theme.colors.backgroundVariant,
                }}
              />
            </View>
          );
        })}
      </View>
    </ViewThemed>
  );
}

export function getEspecializacao(especializacao: Especializacao) {
  switch (especializacao) {
    case 'CLINICO_GERAL':
      return 'Clínico Geral';
    case 'CLINICO_GERAL_PEDIATRA':
      return 'Clínico Geral/Pediatria';
    case 'MEDICO':
      return 'Médico';
    default:
      return 'Desconhecida';
  }
}

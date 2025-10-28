import React, {useEffect, useState} from 'react';

import {Caption} from '../../../ui/theme/components/typography';
import CustomButton from '../../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {Props} from './Props';
import Spacer from '../../../components/Spacer';
import Top from './Top';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeContext';

export default function Card({especialista, turnDatePickerOn}: Props) {
  const nav = useNavigation();

  const [primeiroDiaDisponivel, setPrimeiroDiaDisponivel] = useState('');

  const {theme} = useTheme();

  useEffect(() => {
    let mes = especialista.diasDisponiveis[0].split('-')[1];
    let ano = especialista.diasDisponiveis[0].split('-')[2];

    const dias = especialista.diasDisponiveis.map(v => {
      const split = v.split('-');
      const dia = split[0];
      return Number(dia);
    });

    const ordemCrescente = dias.sort((a, b) => a - b);
    const primeiroDia = ordemCrescente[0];
    setPrimeiroDiaDisponivel(`${primeiroDia}-${mes}-${ano}`);
  }, []);

  return (
    <View style={{paddingVertical: 20, paddingLeft: 40}}>
      <Top especialista={especialista} turnDatePickerOn={turnDatePickerOn} />
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginTop: 22,
          alignItems: 'center',
        }}>
        <Feather name={'calendar'} size={15} color={theme.colors.text} />
        <Caption color={theme.colors.textLabelSecondVariant}>
          Próxima data: {primeiroDiaDisponivel}
        </Caption>
      </View>

      <Spacer />
      <CustomButton
        text="Agendar horário"
        textColor={
          theme.name == 'light' ? theme.colors.text : theme.colors.background
        }
        onClick={() => {
          nav.navigate('ScreenEscolherDia', {especialista: especialista});
        }}
        maxWidth={170}
        bgColor={theme.colors.secondary}
        iconSource={Feather}
        iconName="chevron-right"
        iconSize={15}
        iconColor={
          theme.name == 'light' ? theme.colors.text : theme.colors.background
        }
        height={40}
        paddingVertical={7}
        borderRadius={10}
      />
    </View>
  );
}

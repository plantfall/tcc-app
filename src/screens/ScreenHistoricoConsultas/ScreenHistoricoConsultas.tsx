import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Voltar from '../../components/Voltar';
import {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomPopup from '../../components/CustomPopup';

const HORARIOS = [
  '08:00',
  '08:30',
  '09:00',
  '10:30',
  '10:45',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '13:15',
  '15:45',
];

export default function ScreenHistoricoConsultas() {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Voltar text="Minhas consultas" />

      <View style={{padding: 15}}>
        <Text>A implementar</Text>
      </View>
    </View>
  );
}

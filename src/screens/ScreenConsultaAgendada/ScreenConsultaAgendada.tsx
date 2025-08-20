import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import {useState} from 'react';
import {AppUtils} from '../../utils/AppUtils';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import CardConsulta from '../../components/CardConsulta';
import CustomButton from '../../components/CustomButton';
import OutlineButton from '../../components/OutlineButton';
import {consultaMock} from '../../mocks/Consultas.mock';

type Notificacao = {
  titulo: string;
  mensagem: string;
};

export default function ScreenConsultaAgendada() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const {params} = useRoute();
  const consultaAgendada = AppUtils.TestMode ? consultaMock : params;

  const nav = useNavigation();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'#1B8CB9A1'} barStyle={'light-content'} />
      <View
        style={{
          marginTop: 30,
          backgroundColor: '#1B8CB9A1',
          height: 270,
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{padding: 15}}
            onPress={() => {
              nav.navigate('Home');
            }}>
            <AntDesignIcon name="close" color={'black'} size={20} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: AppUtils.FontSizeGrande + 4,
            fontWeight: '700',
            textAlign: 'left',
            marginLeft: 20,
          }}>
          {'Sua consulta foi agendada\ncom sucesso!'}
        </Text>

        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/banner_consulta_agendada.png')}
            style={{width: 150, height: 150}}
          />
        </View>
      </View>

      <View style={{flex: 1, padding: 20}}>
        <CardConsulta
          emScreenConsultaAgendada={true}
          consulta={consultaAgendada}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <CustomButton text="Ver Agendamentos" onClick={() => {}} />

          <OutlineButton
            text="Voltar para tela inicial"
            onClick={() => nav.navigate('Home')}
          />
        </View>
      </View>
    </View>
  );
}

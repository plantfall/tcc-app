import {
  BackHandler,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {AppUtils} from '../../utils/AppUtils';
import CardConsulta from '../ScreenHistoricoConsultas/components/CardConsulta';
import CustomButton from '../../components/CustomButton';
import OutlineButton from '../../components/OutlineButton';

type Notificacao = {
  titulo: string;
  mensagem: string;
};

export default function ScreenConsultaAgendada() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const {params} = useRoute();

  const editMode = params?.editMode || false;
  const consulta = params.consulta;
  //const editMode = false;
  // const consulta = consultaMock;

  const consultaAgendada = consulta;

  const nav = useNavigation();

  useEffect(() => {
    const onBackPress = () => {
      console.log('cliquei em voltar');
      nav.navigate('Home');
      return true;
    };

    // Adiciona o listener
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    // Remove o listener quando o componente for desmontado
    return () => subscription.remove();
  }, [nav]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'#1B8CB9A1'} barStyle={'light-content'} />
      <View
        style={{
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
          {editMode
            ? 'Sua consulta foi alterada\ncom sucesso!'
            : 'Sua consulta foi agendada\ncom sucesso!'}
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
            rowGap: 20,
            paddingBottom: 20,
          }}>
          <CustomButton
            text="Ver Agendamentos"
            onClick={() => nav.navigate('ScreenHistoricoConsultas')}
          />

          <OutlineButton
            text="Voltar para tela inicial"
            onClick={() => nav.navigate('Home')}
          />
        </View>
      </View>
    </View>
  );
}

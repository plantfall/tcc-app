import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useEffect, useState} from 'react';
import {AppUtils} from '../../utils/AppUtils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Especialista} from '../ScreenAgendarConsulta/useAgendarConsulta';
import CardConsulta from '../../components/CardConsulta';
import CustomButton from '../../components/CustomButton';

type Notificacao = {
  titulo: string;
  mensagem: string;
};

export default function ScreenConsultaAgendada() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  //const {params} = useRoute();

  const params = {
    diaSelecionado: '25/03/2025',
    horarioSelected: '14:30',
    especialistaId: '124_ID',
  };

  const {diaSelecionado, horarioSelected, especialistaId} = params;

  const [especialista, setEspecialista] = useState<Especialista | null>(null);

  const nav = useNavigation();

  useEffect(() => {
    buscaEspecialistaPorId();

    async function buscaEspecialistaPorId() {
      //...

      //setNotificacoes(lista);
      setEspecialista({
        especializacao: 'CLINICO_GERAL',
        nome: 'DJ Pereira',
      });
    }
  }, []);

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
              nav.goBack();
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
        {especialista != null && (
          <CardConsulta
            emScreenConsultaAgendada={true}
            consulta={{
              status: 'AGENDADA',
              dataMarcada: diaSelecionado,
              especialista: especialista,
              horarioMarcado: horarioSelected,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <CustomButton text="Ver Agendamentos" onClick={() => {}} />

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#1B8CB9',
              borderRadius: 10,
              paddingVertical: 15,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 40,
            }}>
            <Text style={{fontSize: AppUtils.FontSize}}>
              Voltar para tela inicial
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

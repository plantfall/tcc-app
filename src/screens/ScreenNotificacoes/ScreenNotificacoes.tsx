import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {AppUtils} from '../../utils/AppUtils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

type Notificacao = {
  titulo: string;
  mensagem: string;
};

export default function ScreenNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const nav = useNavigation();

  useEffect(() => {
    loadNotificacoes();

    async function loadNotificacoes() {
      //...
      const lista: Notificacao[] = [
        {
          titulo: 'Agendamento',
          mensagem:
            'Sua consulta com o Dr. João Henrique foi agendada com sucesso para 15/08 as 15:00!',
        },
      ];
      //setNotificacoes(lista);
      setNotificacoes([]);
    }
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
          <Feather name="bell" color={'black'} size={20} />
          <Text
            style={{
              fontSize: AppUtils.FontSizeGrande,
              fontWeight: '700',
            }}>
            Notificações
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <AntDesignIcon name="close" color={'black'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={notificacoes}
          renderItem={({item}) => <Card notificacao={item} />}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 600,
                marginHorizontal: 15,
              }}>
              <Image
                source={require('../../assets/images/sem_notificacoes.png')}
                style={{width: 300, height: 300}}
              />
              <Text
                style={{
                  fontSize: AppUtils.FontSizeGrande,
                  fontWeight: '700',
                  marginTop: 20,
                }}>
                Sem notificações no momento!
              </Text>
            </View>
          )}
        />

        {notificacoes.length > 0 && (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopColor: '#002230',
              borderWidth: 1,
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: AppUtils.FontSizeMedium}}>
                Marcar todas como lidas
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

type Props = {
  notificacao: Notificacao;
};

function Card({notificacao}: Props) {
  const {titulo, mensagem} = notificacao;

  return (
    <View
      style={{
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#C0C0C036',
        marginBottom: 10,
      }}>
      <Text
        style={{
          fontSize: AppUtils.FontSizeMedium,
          fontWeight: '700',
          marginBottom: 10,
        }}>
        {titulo}
      </Text>
      <Text style={{fontSize: AppUtils.FontSizeMedium}}>{mensagem}</Text>
    </View>
  );
}

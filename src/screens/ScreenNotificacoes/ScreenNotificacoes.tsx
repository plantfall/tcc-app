import {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Notificacao,
  NotificationService,
} from '../../service/NotificationService';
import {AppUtils, theme} from '../../utils/AppUtils';

import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {SessionContext} from '../../context/SessionContext';

export default function ScreenNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const nav = useNavigation();

  const {user} = useContext(SessionContext);

  useEffect(() => {
    loadNotificacoes();

    async function loadNotificacoes() {
      const list = await NotificationService.ListarNotificacoes(user?.uid!);
      setNotificacoes(list);

      // const aux: Notificacao[] = [];
      // for (let i = 0; i < 30; i++) {
      //   aux.push({
      //     id: i + '',
      //     titulo: 'Agendamento de COnsulta',
      //     mensagem: 'Com X dia 10 de outubro de 2025 Às 12:45',
      //   });
      // }

      // setNotificacoes(aux);
    }
  }, []);

  const marcarTodasComoLidas = async () => {
    notificacoes.forEach(async it => {
      try {
        await NotificationService.LimparNotificacao(it.id);
        setNotificacoes([]);
      } catch (e: any) {
        const message = e.message;
        ToastAndroid.show(message, ToastAndroid.LONG);
      }
    });
  };

  return (
    // 1. O contêiner principal com flex: 1 garante que ele ocupe toda a tela.
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* 2. Cabeçalho (Fixo no topo) */}
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

      {/* 3. CONTEÚDO PRINCIPAL: FlatList e o botão.
           Este View tem flex: 1 para ocupar o espaço restante da tela,
           e seus filhos serão dispostos em coluna por padrão. */}
      <View style={{flex: 1}}>
        {/* 4. FLATLIST: Colocamos flex: 1 nela para que ocupe todo o espaço disponível
           entre o cabeçalho e o botão (que virá a seguir). */}
        <FlatList
          data={notificacoes}
          renderItem={({item}) => <Card notificacao={item} />}
          // Adicionando um paddingBottom para que o último item não fique colado no botão, caso exista.
          contentContainerStyle={{
            paddingBottom: notificacoes.length > 0 ? 10 : 0,
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // Removendo o 'height: 600' fixo para que ocupe o espaço restante
                // no container com flex: 1. Podemos usar 'flex: 1' aqui também.
                flex: 1,
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

        {/* 5. BOTÃO "LIMPAR": Ocupa uma porção fixa (height: 100) e fica na parte inferior,
           logo após a FlatList. Como a FlatList tem flex: 1, ela preenche o espaço
           restante e o botão fica fixo no final. */}
        {notificacoes.length > 0 && (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopColor: theme.line,
              borderTopWidth: 0.5,
              backgroundColor: '#fff',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={marcarTodasComoLidas}
              style={{
                backgroundColor: '#1b8cb9',
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 8,
                width: '90%', // Tornando o botão um pouco maior
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: AppUtils.FontSizeMedium,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Limpar notificações
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// O componente Card deve ser mantido ou importado
type Props = {
  notificacao: Notificacao;
};

function Card({notificacao}: Props) {
  const {titulo, mensagem} = notificacao;

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 5,
        borderBottomColor: theme.line,
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', columnGap: 10}}>
        <Foundation name="alert" size={20} color={'#ffc100'} />
        <Text
          style={{
            fontSize: AppUtils.FontSizeMedium,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {titulo}
        </Text>
      </View>

      <Text
        style={{
          fontSize: AppUtils.FontSizeMedium,
          fontWeight: '400',
          color: '#2C2B2B',
        }}>
        {mensagem}
      </Text>

      <Text
        style={{
          fontSize: AppUtils.FontSize,
          fontWeight: '300',
          color: '#2C2B2B',
        }}>
        Se não for possível comparecer, lembre-se de desmarcar.
      </Text>
    </View>
  );
}

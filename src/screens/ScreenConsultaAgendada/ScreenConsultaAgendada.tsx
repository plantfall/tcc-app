import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BackHandler,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import {useEffect} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import ViewThemed from '../../components/ViewThemed';
import {useTheme} from '../../context/ThemeContext';
import {Title} from '../../ui/theme/components/typography';
import CardConsulta from '../ScreenHistoricoConsultas/components/CardConsulta';

export default function ScreenConsultaAgendada() {
  const {params} = useRoute();

  const editMode = params?.editMode || false;
  const consulta = params.consulta;
  // const editMode = false;
  // const consulta = consultaMock;

  const consultaAgendada = consulta;

  const nav = useNavigation();

  const {theme} = useTheme();

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
    <ViewThemed>
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

        <View style={{marginLeft: 20}}>
          <Title>
            {editMode
              ? 'Sua consulta foi alterada\ncom sucesso!'
              : 'Sua consulta foi agendada\ncom sucesso!'}
          </Title>
        </View>

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
          theme={theme}
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

          <CustomButton
            text="Voltar para tela inicial"
            onClick={() => nav.navigate('Home')}
            borderColor={theme.colors.primary}
            borderWidth={1}
            bgColor={theme.colors.background}
            textColor={theme.colors.primary}
          />
        </View>
      </View>
    </ViewThemed>
  );
}

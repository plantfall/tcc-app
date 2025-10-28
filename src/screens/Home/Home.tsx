import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {Body} from '../../ui/theme/components/typography';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import HomeHeader from './components/HomeHeader';
import {SessionContext} from '../../context/SessionContext';
import {Theme} from '../../ui/theme/types';
import {stylesAuth} from '../ScreenSignUp/ScreenSignUp';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';

export default function Home() {
  const {
    user,
    modoDesenvolvedor,
    segundosParaAgendarConsultaEmDevMode,
    setSegundosParaAgendarConsultaEmDevMode,
  } = useContext(SessionContext);

  const {theme} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <HomeHeader nome={user?.nome!} />
      <View style={{rowGap: 20, marginTop: 50, marginHorizontal: 15}}>
        <Item
          text="Agendar Consulta"
          iconName="calendar-check-o"
          destination="ScreenAgendarConsulta"
          theme={theme}
        />
        <Item
          text="Histórico de Consultas"
          iconName="history"
          destination="ScreenHistoricoConsultas"
          theme={theme}
        />
        <Item
          text="Localização da UBS"
          iconName="location-arrow"
          destination="ScreenLocalizacaoUbs"
          theme={theme}
        />

        {modoDesenvolvedor && (
          <View>
            <Text
              style={{
                color: theme.secondondaryColor,
                fontWeight: '700',
                fontSize: 15,
              }}>
              Funcionalidade restrita
            </Text>
            <TextInput
              value={segundosParaAgendarConsultaEmDevMode}
              onChangeText={setSegundosParaAgendarConsultaEmDevMode}
              placeholderTextColor="#808080"
              placeholder="Segundos para agendamento"
              numberOfLines={1}
              autoCapitalize="none"
              keyboardType="numeric"
              style={stylesAuth.input}
            />
          </View>
        )}
      </View>
    </View>
  );
}

type Props = {
  text: string;
  iconName: string;
  destination: string;
  theme: Theme;
};
function Item({text, iconName, destination}: Props) {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        nav.navigate(destination);
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          borderColor: '#d3d1d1ff',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white',
          height: 90,
          paddingHorizontal: 15,
        }}>
        <FontAwesome name={iconName} color={'#1B8CB9'} size={20} />
        <Body>{text}</Body>
      </View>
    </TouchableOpacity>
  );
}

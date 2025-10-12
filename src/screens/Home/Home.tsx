import {Text, TouchableOpacity, View} from 'react-native';

import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {SessionContext} from '../../context/SessionContext';
import {AppUtils} from '../../utils/AppUtils';

export default function Home() {
  const {
    user,
    segundosParaAgendarConsultaEmDevMode,
    setSegundosParaAgendarConsultaEmDevMode,
  } = useContext(SessionContext);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HomeHeader nome={user?.nome!} />
      <View style={{rowGap: 20, marginTop: 50, marginHorizontal: 15}}>
        <Item
          text="Agendar Consulta"
          iconName="calendar-check-o"
          destination="ScreenAgendarConsulta"
        />
        <Item
          text="Histórico de Consultas"
          iconName="history"
          destination="ScreenHistoricoConsultas"
        />
        <Item
          text="Localização da UBS"
          iconName="location-arrow"
          destination="ScreenLocalizacaoUbs"
        />

        {/* <TextInput
          value={segundosParaAgendarConsultaEmDevMode}
          onChangeText={setSegundosParaAgendarConsultaEmDevMode}
          placeholderTextColor="#808080"
          placeholder="Segundos para agendamento"
          numberOfLines={1}
          autoCapitalize="none"
          keyboardType="numeric"
          style={stylesAuth.input}
        /> */}
      </View>
    </View>
  );
}

type Props = {text: string; iconName: string; destination: string};
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
        <Text style={{fontSize: AppUtils.FontSizeMedium}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

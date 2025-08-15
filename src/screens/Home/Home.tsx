import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import HomeHeader from '../../components/HomeHeader';
import {useContext} from 'react';
import {SessionContext} from '../../context/SessionContext';
import {AppUtils} from '../../utils/AppUtils';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const {user} = useContext(SessionContext);
  return (
    <View style={{flex: 1, backgroundColor: '#F2F7F9'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
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
        <Item text="Localização da UBS" iconName="location-arrow" />
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
          padding: 25,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <FontAwesome name={iconName} color={'#1B8CB9'} size={15} />
        <Text style={{fontSize: AppUtils.FontSize}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {AppUtils} from '../utils/AppUtils';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  text: string;
};

export default function Voltar({text}: Props) {
  const nav = useNavigation();

  return (
    <LinearGradient
      colors={AppUtils.Gradient}
      style={{
        marginTop: 20,
        height: 90,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          marginLeft: 30,
        }}
        onPress={() => {
          nav.goBack();
        }}>
        <Feather name="arrow-left" size={27} color={'#000'} />
        <Text style={{fontSize: AppUtils.FontSizeGrande, fontWeight: '700'}}>
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

import {AppUtils} from '../utils/AppUtils';
import {Body} from '../ui/theme/components/typography';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {
  text: string;
};

export default function Voltar({text}: Props) {
  const nav = useNavigation();

  return (
    <LinearGradient
      colors={AppUtils.Gradient}
      style={{
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
        <Feather name="arrow-left" size={25} color={'#000'} />
        <Body weight="bold">{text}</Body>
      </TouchableOpacity>
    </LinearGradient>
  );
}

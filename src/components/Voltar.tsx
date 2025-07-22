import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  text: string;
};

export default function Voltar({text}: Props) {
  const nav = useNavigation();

  return (
    <View
      style={{
        marginTop: 15,
        paddingTop: 40,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 9,
        }}
        onPress={() => {
          nav.goBack();
        }}>
        <AntDesignIcon name="left" size={20} color={'#000'} />
        <Text style={{fontSize: 16}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

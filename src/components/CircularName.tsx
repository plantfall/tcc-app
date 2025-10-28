import {Text, View} from 'react-native';

import {AppUtils} from '../utils/AppUtils';

export type Props = {
  nome: string;
  size?: number;
  fontSize?: number;
};

export function CircularName({
  nome,
  size = 40,
  fontSize = AppUtils.FontSize,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#1B8CB9',
      }}>
      <Text style={{fontSize: fontSize, color: '#002230'}}>
        {nome.charAt(0)}
      </Text>
    </View>
  );
}

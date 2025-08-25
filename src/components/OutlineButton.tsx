import {Text, TouchableOpacity} from 'react-native';
import {AppUtils} from '../utils/AppUtils';

type props = {
  onClick: () => void;
  text: string;
};

export default function OutlineButton({onClick, text}: props) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#1B8CB9',
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onClick}>
      <Text style={{fontSize: AppUtils.FontSize, color: '#1B8CB9'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

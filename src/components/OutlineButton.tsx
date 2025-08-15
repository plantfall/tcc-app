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
        marginTop: 20,
        marginBottom: 40,
      }}
      onPress={onClick}>
      <Text style={{fontSize: AppUtils.FontSize}}>{text}</Text>
    </TouchableOpacity>
  );
}

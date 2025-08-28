import MaskInput from 'react-native-mask-input';
import {stylesAuth} from '../screens/ScreenSignUp/ScreenSignUp';

type props = {
  cartaoSusInput: string;
  setCartaoSusInput: (v: string) => void;
};
export function InputCartaoSus({cartaoSusInput, setCartaoSusInput}: props) {
  return (
    <MaskInput
      value={cartaoSusInput}
      onChangeText={(masked, unmasked) => {
        setCartaoSusInput(unmasked); // you can use the unmasked value as well

        // assuming you typed "9" all the way:
        console.log(masked); // (99) 99999-9999
        console.log(unmasked); // 99999999999
      }}
      placeholderTextColor="#808080"
      placeholder="Informe seu cartão do SUS"
      numberOfLines={1}
      autoCapitalize="none"
      style={stylesAuth.input}
      keyboardType="number-pad"
      mask={[
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
    />
  );
}

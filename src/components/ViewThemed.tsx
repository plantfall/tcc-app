import {View} from 'react-native';
import {useTheme} from '../context/ThemeContext';

export default function ViewThemed({children}) {
  const {theme} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      {children}
    </View>
  );
}

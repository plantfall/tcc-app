import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {AppUtils, BlueColor} from '../../utils/AppUtils.ts';

import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import OutlineButton from '../../components/OutlineButton.tsx';
import {useTheme} from '../../context/ThemeContext.tsx';

export default function ScreenBoarding() {
  const nav = useNavigation();
  const logoAnim = useRef(new Animated.Value(0)).current;
  const {theme} = useTheme();

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#FFFFFF',
      }}>
      <Text
        style={{
          color: '#002230',
          textAlign: 'center',
          fontSize: AppUtils.FontSizeMedium,
          fontWeight: '800',
          marginTop: 15,
          marginBottom: 15,
        }}>
        Seja bem-vindo(a)!
      </Text>
      <Text
        style={{
          color: '#002230',
          textAlign: 'center',
          fontSize: AppUtils.FontSizeMedium,
          fontWeight: '800',
          marginTop: 15,
          marginBottom: 15,
        }}>
        {'Aplicativo destinado à\n UBS de Brás Pires – MG'}
      </Text>

      <View
        style={{
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Animated.Image
          source={require('../../assets/images/boarding.png')}
          style={{
            height: 300,
            width: 300,
            opacity: logoAnim,
            transform: [
              {
                scale: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.77, 1],
                }),
              },
            ],
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderRadius: 20,
          }}
        />
      </View>

      <Text
        style={{
          color: '#002230',
          fontSize: theme.typography.fontSize.large,
          fontWeight: '400',
          marginTop: 25,
          marginBottom: 15,
        }}>
        {'Gerencie e agende suas consultas\ncom facilidade.'}
      </Text>

      <View style={{width: '100%', marginTop: 50, rowGap: 20}}>
        <CustomButton
          textColor="#fff"
          text="Já possuo conta"
          bgColor={BlueColor}
          onClick={() => nav.navigate('ScreenLogin')}
        />

        <OutlineButton
          text="Criar conta"
          onClick={() => nav.navigate('ScreenSignUp')}
        />
      </View>
    </View>
  );
}

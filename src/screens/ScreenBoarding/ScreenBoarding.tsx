import {AppUtils, BlueColor} from '../../utils/AppUtils.ts';
import React, {useEffect, useRef} from 'react';
import {StatusBar, Text, View} from 'react-native';

import {Animated} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import OutlineButton from '../../components/OutlineButton.tsx';
import {useLogin} from './useLogin.tsx';
import {useNavigation} from '@react-navigation/native';

export default function ScreenBoarding() {
  const {handleLogin, isLoading} = useLogin();

  const nav = useNavigation();
  const logoAnim = useRef(new Animated.Value(0)).current;

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
          fontFamily: AppUtils.FontFamily,
        }}>
        Seja bem-vindo(a)!
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
          fontSize: AppUtils.FontSizeGrande,
          fontWeight: '400',
          marginTop: 25,
          marginBottom: 15,
          fontFamily: AppUtils.FontFamily,
        }}>
        {'Gerencie e agende suas consultas\ncom facilidade.'}
      </Text>

      <View style={{width: '100%', marginTop: 50, rowGap: 20}}>
        <CustomButton
          text="Já possuo conta"
          isLoading={isLoading}
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

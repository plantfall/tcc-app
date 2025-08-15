import {View, Text, StatusBar} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import {useLogin} from './useLogin.tsx';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AppUtils} from '../../utils/AppUtils.ts';
import OutlineButton from '../../components/OutlineButton.tsx';
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
        marginTop: 40,
        paddingTop: 0,
      }}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

      <Text
        style={{
          color: 'black',
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
          color: 'black',
          fontSize: AppUtils.FontSizeGrande,
          fontWeight: '400',
          marginTop: 25,
          marginBottom: 15,
          fontFamily: AppUtils.FontFamily,
        }}>
        {'Gerencie e agende suas consultas\ncom facilidade.'}
      </Text>

      <View style={{width: '100%', marginTop: 50}}>
        <CustomButton
          text="Entrar"
          isLoading={isLoading}
          bgColor="#4A90E2"
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

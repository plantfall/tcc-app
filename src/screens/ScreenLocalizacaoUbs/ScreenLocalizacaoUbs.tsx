import {View, Text, StatusBar} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AppUtils, BlueColor} from '../../utils/AppUtils.ts';
import OutlineButton from '../../components/OutlineButton.tsx';
import {useNavigation} from '@react-navigation/native';
import Voltar from '../../components/Voltar.tsx';

export default function ScreenLocalizacaoUbs() {
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
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <Voltar text="Localização da UBS" />
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
          }}>
          <Animated.Image
            source={require('../../assets/images/ubs.jpg')}
            style={{
              height: 300,
              width: '100%',
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
            fontSize: AppUtils.FontSizeMedium,
            fontWeight: 'normal',
            marginBottom: 5,
            marginTop: 10,
          }}>
          Rua: Teste ABc
        </Text>

        <Text
          style={{
            fontSize: AppUtils.FontSizeMedium,
            fontWeight: 'normal',
            marginBottom: 5,
          }}>
          Número: 123
        </Text>
        <Text
          style={{
            fontSize: AppUtils.FontSizeMedium,
            fontWeight: 'normal',
            marginBottom: 5,
          }}>
          Bairro: Centro
        </Text>
      </View>
    </View>
  );
}

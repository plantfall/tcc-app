import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppUtils, BlueColor} from '../../utils/AppUtils.ts';

import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../hooks/useAuth.tsx';
import {stylesAuth} from '../ScreenSignUp/ScreenSignUp.tsx';

export default function ScreenLogin() {
  const {
    setEmailInput,
    handleLogin,
    erro,
    isLoading,
    password,
    setPassword,
    emailInput,
    showPassword,
    setShowPassword,
  } = useAuth();

  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const nav = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flex: 1,
            paddingTop: 0,
          }}
          keyboardShouldPersistTaps="handled">
          <View style={{width: '100%'}}>
            <Animated.Image
              source={require('../../assets/images/img.jpg')}
              style={{
                height: 300,
                width: '100%',
                opacity: logoAnim,
                transform: [
                  {
                    scale: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              }}
            />
          </View>

          <View style={{width: '100%', marginTop: 60, paddingHorizontal: 30}}>
            <Text style={{marginBottom: 7}}>Email</Text>
            <TextInput
              value={emailInput}
              onChangeText={setEmailInput}
              placeholderTextColor="#808080"
              placeholder="Insira o email"
              numberOfLines={1}
              autoCapitalize="none"
              style={stylesAuth.input}
            />

            <Text style={{marginBottom: 7}}>Senha</Text>
            <View style={stylesAuth.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Informe sua senha"
                placeholderTextColor="#808080"
                secureTextEntry={!showPassword}
                numberOfLines={1}
                autoCapitalize="none"
                style={stylesAuth.input}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={stylesAuth.eyeButton}>
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#1B8CB9"
                />
              </TouchableOpacity>
            </View>

            {erro != '' && (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: 14,
                  marginBottom: 15,
                  fontFamily: AppUtils.FontFamily,
                }}>
                {erro}
              </Text>
            )}

            <View style={{marginTop: 60}} />
            <CustomButton
              textColor="#fff"
              text="Entrar"
              isLoading={isLoading}
              bgColor={BlueColor}
              onClick={handleLogin}
            />
          </View>

          <TouchableOpacity
            onPress={() => nav.navigate('ScreenEsqueciMinhaSenha')}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginTop: 40,
                fontFamily: AppUtils.FontFamily,
                color: '#1B8CB9',
              }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

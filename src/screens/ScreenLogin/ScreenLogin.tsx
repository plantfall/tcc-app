import {
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useLogin} from './useLogin.tsx';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AppUtils, BlueColor} from '../../utils/AppUtils.ts';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesAuth} from '../ScreenSignUp/ScreenSignUp.tsx';

export default function ScreenLogin() {
  const {
    setLoginInput,
    handleLogin,
    erro,
    isLoading,
    password,
    setPassword,
    loginInput,
    showPassword,
    setShowPassword,
  } = useLogin();

  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

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
              value={loginInput}
              onChangeText={setLoginInput}
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
              text="Entrar"
              isLoading={isLoading}
              bgColor={BlueColor}
              onClick={handleLogin}
            />
          </View>

          <TouchableOpacity>
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

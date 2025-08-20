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
import CustomButton from '../../components/CustomButton.tsx';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AppUtils} from '../../utils/AppUtils.ts';
import Feather from 'react-native-vector-icons/Feather';
import {useSignUp} from './useSignup.tsx';

export default function ScreenSignUp() {
  const {
    emailInput,
    setNomeInput,
    cartaoSusInput,
    setCartaoSusInput,
    nomeInput,
    setEmailInput,
    handleSignUp,
    erro,
    isLoading,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  } = useSignUp();

  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          flex: 1,
          marginTop: 40,
          paddingTop: 0,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={{width: '100%', alignItems: 'center'}}>
          <Animated.Image
            source={require('../../assets/images/register_banner.png')}
            style={{
              height: 100,
              width: 100,
              opacity: logoAnim,
              transform: [
                {
                  scale: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
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
            fontWeight: '700',
            marginTop: 50,
            marginBottom: 15,
            fontFamily: AppUtils.FontFamily,
          }}>
          {
            'Falta pouco! Cadastre-se e tenha acesso\na todos os nossos serviços.'
          }
        </Text>

        <View style={{width: '100%', marginTop: 90}}>
          <TextInput
            value={nomeInput}
            onChangeText={setNomeInput}
            placeholderTextColor="#808080"
            placeholder="Seu nome completo"
            numberOfLines={1}
            autoCapitalize="sentences"
            style={styles.input}
          />
          <TextInput
            value={cartaoSusInput}
            onChangeText={setCartaoSusInput}
            placeholderTextColor="#808080"
            placeholder="Informe seu cartão do SUS"
            numberOfLines={1}
            autoCapitalize="none"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            value={emailInput}
            onChangeText={setEmailInput}
            placeholderTextColor="#808080"
            placeholder="Informe seu email"
            numberOfLines={1}
            autoCapitalize="none"
            style={styles.input}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Informe sua senha"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword}
              numberOfLines={1}
              autoCapitalize="none"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.eyeButton}>
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

          <View style={{marginTop: 50}} />
          <CustomButton
            text="Criar conta"
            isLoading={isLoading}
            bgColor="#4A90E2"
            onClick={handleSignUp}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#1B8CB9',
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    padding: 12,
    marginBottom: 15,
    color: 'black',
    fontFamily: AppUtils.FontFamily,
    fontSize: AppUtils.FontSize - 2,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

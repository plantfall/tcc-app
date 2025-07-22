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
import {AppUtils} from '../../utils/AppUtils.ts';
import Feather from 'react-native-vector-icons/Feather';

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
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          alignItems: 'center',
          flex: 1,
          marginTop: 40,
          // flexGrow: 1,
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
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderRadius: 20,
            }}
          />
        </View>

        <View style={{width: '100%', marginTop: 20}}>
          <TextInput
            value={loginInput}
            onChangeText={setLoginInput}
            placeholderTextColor="#808080"
            placeholder="Informe seu cartão do SUS"
            numberOfLines={1}
            autoCapitalize="none"
            style={styles.input}
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
                color="#808080"
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

          <CustomButton
            text="Entrar"
            isLoading={isLoading}
            bgColor="#4A90E2"
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
            }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
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

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {AuthService} from '../../service/AuthService.ts';
import {AppUtils} from '../../utils/AppUtils.ts';
import Voltar from '../../components/Voltar.tsx';
import CustomButton from '../../components/CustomButton.tsx';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleResetPassword = async () => {
    setErro('');

    setLoading(true);
    try {
      const authService = new AuthService();

      await authService.resetPassword(email);
      Alert.alert('Sucesso', 'Email de redefinição enviado com sucesso!');
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Voltar text="Esqueci minha senha" />
      <View style={styles.container}>
        <Text style={styles.description}>
          Insira seu e-mail e enviaremos um link para redefinir sua senha
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor={'#9E9E9E'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <CustomButton
          onClick={handleResetPassword}
          text={loading ? 'Enviando...' : 'Enviar email de redefinição'}
          isLoading={loading}
        />

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: AppUtils.FontSizeMedium + 2,
    marginBottom: 16,
    color: '#002230',
  },
  input: {
    borderWidth: 1,
    borderColor: '#006083',
    color: 'black',
    borderRadius: 8,
    padding: 12,
    marginBottom: 110,
    backgroundColor: '#fff',
    fontSize: AppUtils.FontSize,
  },
  button: {
    backgroundColor: '#002230',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: AppUtils.FontSize,
  },
  buttonText: {
    color: '#fff',
    fontSize: AppUtils.FontSizeMedium,
  },
});

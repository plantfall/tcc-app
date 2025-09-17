import {View, Text, StatusBar, Linking, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AppUtils} from '../../utils/AppUtils.ts';
import Voltar from '../../components/Voltar.tsx';

export default function ScreenLocalizacaoUbs() {
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
      <View>
        <Animated.Image
          source={require('../../assets/images/ubs_lozalizacao.png')}
          style={{
            height: 220,
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
          }}
        />

        <Card />
      </View>
    </View>
  );
}

function Card() {
  const abrirNoGoogleMaps = () => {
    const url = `geo:-20.8478292,-43.2487386?q=UBS Brás Pires`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.card_view}>
      <Text style={styles.title}>UBS Brás Pires</Text>

      <Text style={[styles.subtitle, {marginTop: 30}]}>
        Horário de funcionamento
      </Text>
      <Text style={styles.label}>Segunda a sexta: 07h -16h</Text>

      <Text style={[styles.subtitle]}>Telefone</Text>
      <Text style={styles.label}>(32) 98410-6022</Text>

      <Text style={[styles.subtitle]}>Acessibilidade</Text>
      <CustomButton onClick={abrirNoGoogleMaps} text="Ver rotas no mapa" />
    </View>
  );
}

const styles = StyleSheet.create({
  card_view: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAE6C9',
    marginTop: 20,
    marginHorizontal: 10,
  },

  title: {
    fontSize: AppUtils.FontSizeGrande + 2,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: AppUtils.FontSizeMedium,
    fontWeight: '600',
    marginTop: 10,
  },

  label: {
    fontSize: AppUtils.FontSize,
    color: '#6A6868',
    fontWeight: 'normal',
    marginTop: 2,
  },
});

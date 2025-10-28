import {
  Body,
  Label,
  Title,
} from '../../ui/theme/components/typography/index.tsx';
import {Linking, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {Animated} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import Spacer from '../../components/Spacer.tsx';
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
      <Title>UBS Brás Pires</Title>
      <Spacer height={30} />

      <Body weight="bold">Horário de funcionamento</Body>
      <Label style={styles.label}>Segunda a sexta: 07h -16h</Label>

      <Spacer />
      <Body weight="bold">Telefone</Body>
      <Label style={styles.label}>(32) 98410-6022</Label>
      <Spacer />

      <Body weight="bold">Acessibilidade</Body>
      <Spacer />
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
});

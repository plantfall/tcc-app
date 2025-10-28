import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton.tsx';
import {InputCartaoSus} from '../../components/InputCartaoSus.tsx';
import Spacer from '../../components/Spacer.tsx';
import ViewThemed from '../../components/ViewThemed.tsx';
import {SessionContext} from '../../context/SessionContext.tsx';
import {useTheme} from '../../context/ThemeContext.tsx';
import {UserService} from '../../service/UserService.ts';
import {Body} from '../../ui/theme/components/typography/index.tsx';
import {perfilStyles} from '../ScreenPerfil/ScreenPerfil.tsx';

export default function ScreenEditarCartaoSus() {
  const [atualizando, setAtualizando] = useState(false);

  const {sair, user, updateCartaoSus, setModoDesenvolvedor} =
    useContext(SessionContext);
  const [cartaoSus, setCartaoSus] = useState<string>(user?.cartaoSus || '');

  const nav = useNavigation();

  const route = useRoute();
  const editMode = route.params?.editMode as boolean;

  const {theme} = useTheme();

  const handleAtualizarCartaoSus = async () => {
    const as = new UserService();
    try {
      setAtualizando(true);
      await as.updateCartaoSus(cartaoSus, user?.uid!);
      await updateCartaoSus(cartaoSus);
      ToastAndroid.show('Atualizado com sucesso', ToastAndroid.LONG);
      nav.goBack();
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setAtualizando(false);
    }
  };

  return (
    <ViewThemed>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 20,
          alignItems: 'center',
          paddingLeft: 15,
          marginTop: 20,
        }}>
        <TouchableOpacity style={{padding: 5}} onPress={() => nav.goBack()}>
          <Feather name="arrow-left" size={25} color={theme.colors.text} />
        </TouchableOpacity>

        <Body weight="bold">Cartão do SUS</Body>
      </View>
      <View style={{borderWidth: 0.6, borderBottomColor: '#CBCBCB'}} />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          style={{
            height: 80,
            width: '100%',
            objectFit: 'contain',
          }}
          source={require('../../assets/images/user_cartao_sus.png')}
        />
      </View>

      <View style={{marginTop: 40, paddingHorizontal: 20}}>
        <Body
          weight="bold"
          color={
            theme.name == 'light'
              ? theme.colors.textSecondaryVariant //secondondaryColor
              : theme.colors.text
          }>
          O Cartão do SUS permite que suas informações médicas sejam vinculadas
          ao seu perfil no sistema público de saúde.
        </Body>

        <Spacer />
        <View>
          <Body weight="bold">Cartão do SUS</Body>

          <Spacer height={5} />
          <InputCartaoSus
            style={perfilStyles.container}
            cartaoSusInput={cartaoSus}
            setCartaoSusInput={setCartaoSus}
          />
        </View>

        <View style={{marginBottom: 200}} />

        <CustomButton
          text={editMode ? 'Atualizar' : 'Salvar'}
          iconSource={Feather}
          iconName="check"
          textColor={
            theme.name == 'light' ? theme.colors.background : theme.colors.text
          }
          iconColor={
            theme.name == 'light' ? theme.colors.background : theme.colors.text
          }
          onClick={handleAtualizarCartaoSus}
          isLoading={atualizando}
        />
      </View>
    </ViewThemed>
  );
}

import {AppUtils, isEmpty} from '../../utils/AppUtils.ts';
import {StyleSheet, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useContext, useState} from 'react';

import {AuthService} from '../../service/AuthService.ts';
import {Body} from '../../ui/theme/components/typography/index.tsx';
import {CircularName} from '../../components/CircularName.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import CustomPopup from '../../components/CustomPopup.tsx';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import {SessionContext} from '../../context/SessionContext.tsx';
import Spacer from '../../components/Spacer.tsx';
import {UserService} from '../../service/UserService.ts';
import ViewThemed from '../../components/ViewThemed.tsx';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext.tsx';

// Definição da constante para o tempo máximo entre cliques (ex: 500ms)
const TRIPLE_CLICK_INTERVAL = 500;
let clickTimer: NodeJS.Timeout | null = null;

export default function ScreenPerfil() {
  const [cartaoSusVisibility, setcartaoSusVisibility] = useState(false);

  const {sair, user, setModoDesenvolvedor} = useContext(SessionContext);
  const cartaoSus = user?.cartaoSus!;

  const [clickCount, setClickCount] = useState(0);
  const [popupVisibility, setPopupVisibility] = useState(false);

  const nav = useNavigation();

  const {theme} = useTheme();

  async function handleDeleteAccount() {
    const authService = new AuthService();
    const userService = new UserService();

    try {
      await authService.reauthenticate(user?.email!, user?.password!);
      await authService.deleteAccount();
      await userService.delete(user?.uid!);
      await sair();
    } catch (e: any) {
      ToastAndroid.show(e.message, ToastAndroid.LONG);
      setPopupVisibility(false);
    }
  }

  function formatarCartaoSus() {
    if (cartaoSus == '') {
      return 'Vazio!';
    }

    const first = cartaoSus.at(0)! + cartaoSus.at(1) + cartaoSus.at(2);
    const second =
      cartaoSus.at(3)! + cartaoSus.at(4) + cartaoSus.at(5) + cartaoSus.at(6);
    const third =
      cartaoSus.at(7)! + cartaoSus.at(8) + cartaoSus.at(9) + cartaoSus.at(10);
    const fourth =
      cartaoSus.at(11)! +
      cartaoSus.at(12) +
      cartaoSus.at(13) +
      cartaoSus.at(14);

    return `${first} ${second} ${third} ${fourth}`;
  }

  const executeTripleClickAction = () => {
    ToastAndroid.show('Função secreta executada! 🤫', ToastAndroid.LONG);
    console.log('Triple click detectado e executado.');
    setModoDesenvolvedor(true);
  };

  /**
   * NOVO MÉTODO: Lógica para rastrear os cliques
   */
  const handleTripleClick = () => {
    // 1. Limpa o timer anterior (se existir)
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    // 2. Incrementa a contagem de cliques
    setClickCount(prevCount => {
      const newCount = prevCount + 1;

      if (newCount === 3) {
        // 3. SE for o terceiro clique, executa a ação e reseta o contador
        executeTripleClickAction();
        return 0; // Reseta o contador
      }

      // 4. Configura um novo timer para resetar se não houver clique em TRIPLE_CLICK_INTERVAL (500ms)
      // O timer só deve ser configurado se não for o último clique
      if (newCount < 3) {
        clickTimer = setTimeout(() => {
          setClickCount(0); // Reseta se o tempo esgotar
          clickTimer = null;
        }, TRIPLE_CLICK_INTERVAL);
      }

      return newCount; // Atualiza a contagem
    });
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

        <Body weight="bold">Minha Área</Body>
      </View>
      <Spacer height={20} />
      <View style={{borderWidth: 0.6, borderBottomColor: '#CBCBCB'}} />
      <Spacer height={20} />

      <CustomPopup
        title="Tem certeza que quer excluir sua conta?"
        message="Todos os seus dados serão apagados e não será possível recuperá-los depois. Esperamos ver você por aqui novamente!"
        visible={popupVisibility}
        onClose={() => setPopupVisibility(false)}
        btns={[
          {
            text: 'Cancelar',
            color: theme.colors.primary,
            borderRadius: 10,
            borderColor: theme.colors.primary,
            borderWidth: 1,
            bgColor: 'white',
            onClick: () => setPopupVisibility(false),
          },
          {
            text: 'Confirmar',
            bgColor: theme.colors.textSecondaryVariant,
            borderRadius: 10,
            onClick: async () => {
              await handleDeleteAccount();
            },
          },
        ]}
      />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity onPress={handleTripleClick}>
          <CircularName nome={user?.nome!} size={90} fontSize={40} />
        </TouchableOpacity>

        <Spacer height={20} />
        <Body weight="bold" color={theme.colors.textSecondaryVariant}>
          {user?.nome}
        </Body>
      </View>
      <Spacer height={20} />

      <View style={{marginTop: 30, paddingHorizontal: 20}}>
        <View>
          <Body weight="bold">Email</Body>
          <Spacer height={5} />

          <View style={perfilStyles.container}>
            <Body>{user?.email}</Body>
          </View>
        </View>

        {!isEmpty(cartaoSus) && (
          <View
            style={[
              perfilStyles.passwordContainer,
              {
                marginTop: 10,
              },
            ]}>
            <Body weight="bold">Cartão do SUS</Body>
            <Spacer height={5} />
            <View style={perfilStyles.container}>
              <Body>
                {cartaoSusVisibility
                  ? formatarCartaoSus()
                  : '*** **** **** ****'}
              </Body>
              <TouchableOpacity
                onPress={() => setcartaoSusVisibility(prev => !prev)}
                style={perfilStyles.eyeButton}>
                <Feather
                  name={cartaoSusVisibility ? 'eye-off' : 'eye'}
                  size={20}
                  color="#808080"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            nav.navigate('ScreenEditarCartaoSus', {
              editMode: !isEmpty(cartaoSus),
            });
          }}
          style={{
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: 40,
          }}>
          {isEmpty(cartaoSus) ? (
            <FontAwesome name={'address-card'} size={20} color="#808080" />
          ) : (
            <MI name={'mode-edit'} size={20} color="#808080" />
          )}

          <Body weight="bold" color={theme.colors.textSecondaryVariant}>
            {isEmpty(cartaoSus)
              ? 'Adicionar cartão do SUS'
              : 'Editar cartão do SUS'}
          </Body>
        </TouchableOpacity>

        <View style={{marginBottom: 15}} />

        <View
          style={{
            borderColor: theme.colors.border,
            width: '100%',
            borderWidth: 0.2,
          }}
        />
        <View style={{marginBottom: 15}} />

        <TouchableOpacity
          onPress={() => setPopupVisibility(true)}
          style={{
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <Feather name={'trash-2'} size={20} color="#808080" />
          <Body weight="bold" color={theme.colors.textSecondaryVariant}>
            Excluir conta
          </Body>
        </TouchableOpacity>

        <Spacer height={40} />

        <CustomButton
          text="Sair da conta"
          iconSource={Feather}
          iconName="log-out"
          iconColor={
            theme.name == 'light'
              ? theme.colors.background
              : theme.colors.background
          }
          onClick={async () => {
            await sair();
          }}
        />
      </View>
    </ViewThemed>
  );
}

export const perfilStyles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    padding: 12,
    height: 60,
    marginBottom: 15,
    color: 'black',
    fontFamily: AppUtils.FontFamily,
    fontSize: AppUtils.FontSize,
    justifyContent: 'center',
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
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

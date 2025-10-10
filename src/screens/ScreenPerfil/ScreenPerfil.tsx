import {useContext, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {CircularName} from '../../components/CircularName.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import {InputCartaoSus} from '../../components/InputCartaoSus.tsx';
import {SessionContext} from '../../context/SessionContext.tsx';
import {AuthService} from '../../service/AuthService.ts';
import {AppUtils} from '../../utils/AppUtils.ts';

// Definição da constante para o tempo máximo entre cliques (ex: 500ms)
const TRIPLE_CLICK_INTERVAL = 500;
let clickTimer: NodeJS.Timeout | null = null;

export default function ScreenPerfil() {
  const [cartaoSusVisibility, setcartaoSusVisibility] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const {sair, user, updateCartaoSus, setModoDesenvolvedor} =
    useContext(SessionContext);
  const [cartaoSus, setCartaoSus] = useState<string>(user?.cartaoSus || '');

  const [clickCount, setClickCount] = useState(0);

  const nav = useNavigation();

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

  const handleAtualizarCartaoSus = async () => {
    const as = new AuthService();
    try {
      setAtualizando(true);
      await as.updateCartaoSus(cartaoSus, user?.uid!);
      await updateCartaoSus(cartaoSus);
      ToastAndroid.show('Atualizado com sucesso', ToastAndroid.LONG);
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setAtualizando(false);
      setModoEdicao(false);
    }
  };

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
    <View style={{gap: 20, backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'#000'} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          columnGap: 20,
          alignItems: 'center',
          paddingLeft: 15,
          marginTop: 20,
        }}>
        <TouchableOpacity style={{padding: 5}} onPress={() => nav.goBack()}>
          <Feather name="arrow-left" size={27} color={'#000'} />
        </TouchableOpacity>

        <Text style={{fontSize: AppUtils.FontSizeGrande, fontWeight: '700'}}>
          Minha Área
        </Text>
      </View>
      <View style={{borderWidth: 0.6, borderBottomColor: '#CBCBCB'}} />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity onPress={handleTripleClick}>
          <CircularName nome={user?.nome!} size={90} fontSize={40} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: AppUtils.FontSizeGrande,
            fontWeight: '700',
            marginTop: 20,
            color: '#002230',
          }}>
          {user?.nome}
        </Text>
      </View>

      <View style={{marginTop: 70, paddingHorizontal: 20}}>
        <View>
          <Text
            style={{
              fontSize: AppUtils.FontSize,
              fontWeight: '700',
              marginBottom: 5,
            }}>
            Cartão do SUS
          </Text>

          {!modoEdicao ? (
            <View style={styles.passwordContainer}>
              <View style={styles.container}>
                <Text>
                  {cartaoSusVisibility
                    ? formatarCartaoSus()
                    : '*** **** **** ****'}
                </Text>
                <TouchableOpacity
                  onPress={() => setcartaoSusVisibility(prev => !prev)}
                  style={styles.eyeButton}>
                  <Feather
                    name={cartaoSusVisibility ? 'eye-off' : 'eye'}
                    size={20}
                    color="#808080"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <InputCartaoSus
              style={styles.container}
              cartaoSusInput={cartaoSus}
              setCartaoSusInput={setCartaoSus}
            />
          )}

          <CustomButton
            text="Editar cartão sus"
            borderRadius={12}
            bgColor="green"
            onClick={() => setModoEdicao(it => !it)}
          />

          {cartaoSus.length == 15 && modoEdicao && (
            <>
              <View style={{marginBottom: 15}} />
              <CustomButton
                text="Salvar cartão sus"
                borderRadius={12}
                onClick={handleAtualizarCartaoSus}
                isLoading={atualizando}
              />
            </>
          )}
        </View>

        <View style={{marginBottom: 15}} />

        <View>
          <Text
            style={{
              fontSize: AppUtils.FontSize,
              fontWeight: '700',
              marginBottom: 5,
            }}>
            Email
          </Text>

          <View style={styles.container}>
            <Text>{user?.email}</Text>
          </View>
        </View>
        {/* 
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            columnGap: 20,
            width: 150,
            marginBottom: 50,
          }}>
          <Feather name={'trash'} size={20} color="#808080" />
          <Text
            style={{
              fontSize: AppUtils.FontSize,
            }}>
            Excluir conta
          </Text>
        </TouchableOpacity> */}

        <CustomButton
          text="Sair da conta"
          iconSource={Feather}
          iconName="log-out"
          onClick={async () => {
            await sair();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

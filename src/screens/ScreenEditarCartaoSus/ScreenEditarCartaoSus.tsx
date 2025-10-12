import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton.tsx';
import {InputCartaoSus} from '../../components/InputCartaoSus.tsx';
import {SessionContext} from '../../context/SessionContext.tsx';
import {UserService} from '../../service/UserService.ts';
import {AppUtils} from '../../utils/AppUtils.ts';
import {perfilStyles} from '../ScreenPerfil/ScreenPerfil.tsx';

export default function ScreenEditarCartaoSus() {
  const [atualizando, setAtualizando] = useState(false);

  const {sair, user, updateCartaoSus, setModoDesenvolvedor} =
    useContext(SessionContext);
  const [cartaoSus, setCartaoSus] = useState<string>(user?.cartaoSus || '');

  const nav = useNavigation();

  const route = useRoute();
  const editMode = route.params?.editMode as boolean;

  const handleAtualizarCartaoSus = async () => {
    const as = new UserService();
    try {
      setAtualizando(true);
      await as.updateCartaoSus(cartaoSus, user?.uid!);
      await updateCartaoSus(cartaoSus);
      ToastAndroid.show('Atualizado com sucesso', ToastAndroid.LONG);
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setAtualizando(false);
    }
  };

  return (
    <View style={{gap: 20, backgroundColor: '#fff', flex: 1}}>
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
          Cartão do SUS
        </Text>
      </View>
      <View style={{borderWidth: 0.6, borderBottomColor: '#CBCBCB'}} />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          style={{
            height: 80,
            width: '100%',
            objectFit: 'contain',
          }}
          source={require('../../assets/images/register_banner.png')}
        />
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
          onClick={handleAtualizarCartaoSus}
          isLoading={atualizando}
        />
      </View>
    </View>
  );
}

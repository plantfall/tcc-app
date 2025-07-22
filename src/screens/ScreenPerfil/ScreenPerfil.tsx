import {View, Text, Image, StatusBar} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import {useContext} from 'react';
import Voltar from '../../components/Voltar.tsx';
import {useLocalDataHook} from '../../hooks/useLocalDataHook.tsx';

export default function ScreenPerfil() {
  const {sair} = useContext(AuthContext);
  const {fotoBase64, user} = useLocalDataHook();

  const handleLogout = async () => {
    await sair();
  };

  return (
    <View style={{gap: 20, padding: 20}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

      <Voltar text="Perfil" />

      <View style={{alignItems: 'center', gap: 20}}>
        <Image
          source={
            fotoBase64 == null
              ? require('../../assets/images/user.png')
              : {uri: fotoBase64}
          }
          style={{
            height: 110,
            width: 110,
            borderRadius: 90 / 2,
          }}
        />

        <Text style={{fontWeight: '700', fontSize: 16}}>{user?.nome}</Text>
        <Text style={{fontSize: 14}}>{user?.email}</Text>

        <View style={{paddingHorizontal: 20, width: '100%'}}>
          <CustomButton text="Sair" bgColor="#4A90E2" onClick={handleLogout} />
        </View>
      </View>
    </View>
  );
}

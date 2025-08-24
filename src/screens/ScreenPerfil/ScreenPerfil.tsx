import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomButton from '../../components/CustomButton.tsx';
import {useContext, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AppUtils} from '../../utils/AppUtils.ts';
import {CircularName} from '../../components/CircularName.tsx';
import {useNavigation} from '@react-navigation/native';
import {SessionContext} from '../../context/SessionContext.tsx';

export default function ScreenPerfil() {
  const [cartaoSusVisibility, setcartaoSusVisibility] = useState(false);

  const {sair, user} = useContext(SessionContext);
  const [cartaoSus, setCartaoSus] = useState(user?.cartaoSus);

  const nav = useNavigation();

  return (
    <View style={{gap: 20, marginTop: 30}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />

      <View
        style={{
          flexDirection: 'row',
          columnGap: 20,
          alignItems: 'center',
          paddingLeft: 20,
        }}>
        <TouchableOpacity style={{padding: 5}} onPress={() => nav.goBack()}>
          <Feather name="arrow-left" size={27} color={'#000'} />
        </TouchableOpacity>

        <Text style={{fontSize: AppUtils.FontSizeGrande, fontWeight: '700'}}>
          Minha Área
        </Text>
      </View>
      <View style={{borderWidth: 1, borderBottomColor: 'black'}} />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <CircularName nome={user?.nome} size={90} fontSize={40} />
        <Text
          style={{
            fontSize: AppUtils.FontSizeGrande,
            fontWeight: '700',
            marginTop: 20,
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
          <View style={styles.passwordContainer}>
            <View style={styles.container}>
              <Text>
                {cartaoSusVisibility ? cartaoSus : 'xxxx.xxxxx.xxx/xx'}
              </Text>
            </View>

            {/* <TextInput
              value={cartaoSus}
              onChangeText={setCartaoSus}
              placeholder="xxxx.xxxxx.xxx/xx"
              placeholderTextColor="#808080"
              numberOfLines={1}
              autoCapitalize="none"
              style={styles.input}
            /> */}
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

        <View>
          <Text
            style={{
              fontSize: AppUtils.FontSize,
              fontWeight: '700',
              marginBottom: 5,
            }}>
            Email
          </Text>
          <View style={styles.passwordContainer}>
            <View style={styles.container}>
              <Text>{user?.email}</Text>
            </View>
          </View>
        </View>

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
        </TouchableOpacity>

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

import {Image, Text, View} from 'react-native';

export default function Header() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{fontWeight: '700', fontSize: 22}}>Olá, Mendes</Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 10,
          }}>
          Bem vindo ao VendaIA
        </Text>
      </View>
      <View>
        <Image
          source={require('../assets/images/user.jpg')}
          style={{
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
          }}
        />
      </View>
    </View>
  );
}

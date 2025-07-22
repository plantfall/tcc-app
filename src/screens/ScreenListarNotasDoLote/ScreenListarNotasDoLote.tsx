import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {LoteRecebimento, VendaIaItem} from '../../@types/Recebimento.types';
import NFItem from '../../components/Lancamento/NFItem';
import Voltar from '../../components/Voltar';

export default function ScreenListarNotasDoLote() {
  const route = useRoute();
  const {loteItens, loteAtual} = route.params as {
    loteItens: VendaIaItem[];
    loteAtual: LoteRecebimento;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Voltar text="Voltar" />

      <View style={styles.header}>
        <Text style={styles.title}>Notas do Lote #{loteAtual.num}</Text>
        <Text style={styles.subtitle}>
          Abaixo estão listadas as notas fiscais geradas neste lote.
        </Text>
      </View>

      <FlatList
        data={loteItens}
        keyExtractor={item => `${item.id}-${item.nfNum}`}
        renderItem={({item}) => <NFItem nfe={item} />}
        contentContainerStyle={
          loteItens.length === 0 ? styles.emptyList : styles.listContainer
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma nota foi gerada neste lote ainda.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 30,
    gap: 10,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
});

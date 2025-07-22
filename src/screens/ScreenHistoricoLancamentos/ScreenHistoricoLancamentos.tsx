import {
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Lancamento from '../../components/Lancamento/Lancamento';
import HomeHeader from '../../components/HomeHeader';
import CustomButton from '../../components/CustomButton';
import {useScreenHistoricoLancamentos} from './useScreenHistoricoLancamentos';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ConverterDataParaFormatoBrasileiro} from '../../utils/DateUtils';

export default function ScreenHistoricoLancamentos() {
  const {
    loading,
    adminMode,
    storageLoteService,
    dataInicial,
    dataFinal,
    showDataInicial,
    showDataFinal,
    filtroStatus,
    lancamentosFiltrados,
    statusList,
    setFiltroStatus,
    setDataFinal,
    setDataInicial,
    setShowDataFinal,
    setShowDataInicial,
    setLancamentos,
  } = useScreenHistoricoLancamentos();

  if (loading) {
    return (
      <View style={{padding: 20, flex: 1}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <HomeHeader fromHome={false} />
        <ActivityIndicator color="blue" size={60} style={{marginTop: 90}} />
      </View>
    );
  }

  return (
    <View style={{padding: 20, flex: 1, gap: 10, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <HomeHeader fromHome={false} />

      {adminMode && (
        <View style={{marginVertical: 10}}>
          <CustomButton
            text="Admin - Excluir todas"
            onClick={async () => {
              await storageLoteService.excluiTudo();
            }}
          />
        </View>
      )}

      <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>
        Notas geradas
      </Text>

      <View style={{marginBottom: 5}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row'}}>
          {statusList.map(status => (
            <TouchableOpacity
              key={status}
              onPress={() => setFiltroStatus(status)}
              style={{
                backgroundColor: filtroStatus === status ? '#007BFF' : '#eee',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: filtroStatus === status ? '#fff' : '#000',
                  fontSize: 12,
                }}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          marginBottom: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => setShowDataInicial(true)}
          style={{
            backgroundColor: '#eee',
            padding: 8,
            borderRadius: 8,
            marginRight: 10,
          }}>
          <Text style={{fontSize: 12}}>
            {dataInicial
              ? ConverterDataParaFormatoBrasileiro(dataInicial.getTime())
              : 'Data inicial'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowDataFinal(true)}
          style={{backgroundColor: '#eee', padding: 8, borderRadius: 8}}>
          <Text style={{fontSize: 12}}>
            {dataFinal
              ? ConverterDataParaFormatoBrasileiro(dataFinal.getTime())
              : 'Data final'}
          </Text>
        </TouchableOpacity>
        {(dataInicial || dataFinal) && (
          <TouchableOpacity
            onPress={() => {
              setDataInicial(null);
              setDataFinal(null);
            }}
            style={{marginLeft: 10}}>
            <Text style={{color: 'red', fontSize: 12}}>Limpar datas</Text>
          </TouchableOpacity>
        )}
      </View>

      {showDataInicial && (
        <DateTimePicker
          value={dataInicial || new Date()}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate?: Date) => {
            setShowDataInicial(false);
            if (event.type === 'set' && selectedDate) {
              setDataInicial(selectedDate);
            }
          }}
        />
      )}
      {showDataFinal && (
        <DateTimePicker
          value={dataFinal || new Date()}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate?: Date) => {
            setShowDataFinal(false);
            if (event.type === 'set' && selectedDate) {
              setDataFinal(selectedDate);
            }
          }}
        />
      )}

      <FlatList
        data={lancamentosFiltrados}
        keyExtractor={item => `${item.num}-${item.uuid}`}
        renderItem={({item}) => (
          <Lancamento
            loteItem={item}
            onRemoverLote={async uuid => {
              try {
                await storageLoteService.removeLoteDaFila(uuid, item.status);

                setLancamentos(prev => prev.filter(lote => lote.uuid !== uuid));
              } catch (error) {
                console.error('Erro ao remover lote:', error);
              }
            }}
          />
        )}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={{marginTop: 20}}>
            Você não possui notas com esse status
          </Text>
        )}
      />
    </View>
  );
}

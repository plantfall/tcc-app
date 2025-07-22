import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import {TpBandeira, TipoRecebimento} from '../@types/Recebimento.types';
import {GetDescricaoDaBandeira} from '../mapper/TipoBandeiraToDescricaoMapper';

const bandeiras = Object.keys(GetDescricaoDaBandeira as any) as TpBandeira[];

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (tipo: TipoRecebimento, bandeira: TpBandeira) => void;
};

type Tipo = {
  label: string;
  value: TipoRecebimento;
};
export default function PagamentoSelectorModal({
  visible,
  onClose,
  onConfirm,
}: Props) {
  const tipos: Tipo[] = [
    {label: 'Cartão de Crédito', value: 'CARTAO_CRED'},
    {label: 'Cartão de Débito', value: 'CARTAO_DEB'},
  ];

  const listaBandeiras = bandeiras.map(b => ({
    label: GetDescricaoDaBandeira(b),
    value: b,
  }));

  const [tipoSelecionado, setTipoSelecionado] =
    React.useState<TipoRecebimento | null>(null);
  const [bandeiraSelecionada, setBandeiraSelecionada] =
    React.useState<TpBandeira | null>(null);

  const confirmar = () => {
    if (tipoSelecionado && bandeiraSelecionada) {
      onConfirm(tipoSelecionado, bandeiraSelecionada);
      onClose();
      setTipoSelecionado(null);
      setBandeiraSelecionada(null);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Escolha o tipo de cartão</Text>

          {tipos.map(t => (
            <TouchableOpacity
              key={t.value}
              style={[
                styles.option,
                tipoSelecionado === t.value && styles.optionSelected,
              ]}
              onPress={() => setTipoSelecionado(t.value)}>
              <Text>{t.label}</Text>
            </TouchableOpacity>
          ))}

          {tipoSelecionado && (
            <>
              <Text style={[styles.title, {marginTop: 15}]}>
                Escolha a bandeira
              </Text>

              <FlatList
                data={listaBandeiras}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      bandeiraSelecionada === item.value &&
                        styles.optionSelected,
                    ]}
                    onPress={() => setBandeiraSelecionada(item.value)}>
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
                style={{maxHeight: 250}}
              />
            </>
          )}

          <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
            <Pressable style={styles.cancel} onPress={onClose}>
              <Text style={{color: '#000'}}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.confirm,
                !(tipoSelecionado && bandeiraSelecionada) && {opacity: 0.5},
              ]}
              onPress={confirmar}
              disabled={!tipoSelecionado || !bandeiraSelecionada}>
              <Text style={{color: 'white', fontSize: 12}}>Adicionar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#007bff33',
    borderColor: '#007bff',
  },
  confirm: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

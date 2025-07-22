// import {test, assert, beforeEach} from 'poku';
// import {LoteRectoDTO} from '../src/@types/RecebimentoTypes';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {StorageLoteService} from '../src/service/StorageLoteService';

// const service = new StorageLoteService();

// beforeEach(async () => {
//   // usa o mock para limpar a “falsa” storage
//   await AsyncStorage.clear();
// });

// test('salvar e extrair lote da fila', async () => {
//   const lote: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '9876543210',
//     listTpRecebimento: [],
//   };

//   await service.salvaLoteNaFila(lote);

//   console.log('teste');

//   const fila = await service.extraiLoteDaFila();
//   assert.equal(fila.length, 1);
//   assert.equal(fila[0].whatsApp, '9876543210');
// });

// test('recuperar_lote', async () => {
//   const lote: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '9876543210',
//     listTpRecebimento: [],
//   };

//   await service.salvaLoteNaFila(lote);

//   const fila = await service.extraiLoteDaFila();

//   assert.deepEqual(fila[0], lote);
// });

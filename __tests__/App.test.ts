import {test, assert, beforeEach} from 'poku';
import {
  LoteRectoDTO,
  TipoRecebimento,
  TpBandeira,
  LoteStatus,
  LoteRecebimentoRequestDto,
} from '../src/@types/Recebimento.types';
import uuid from 'react-native-uuid';

test('salvar_lote', async () => {
  const recRequestDto: LoteRecebimentoRequestDto = {
    enviarBandeira: false,
    enviarNfe: false,
    uuid: uuid.v4(),
    origemGeracao: {
      navegador: {
        mobile: true,
        platform: 'android',
        so: 'android',
        userAgent: 'android',
      },
      tpPlataforma: 'ANDROID',
    },
    whatsApp: '12345678910',
    listLoteVendaIaItem: [],
  };

  //

  const fila: LoteRectoDTO[] = [];

  const uuidGerado = recRequestDto.uuid;

  const recDtoLote: LoteRectoDTO = {
    enviarBandeira: recRequestDto.enviarBandeira,
    enviarNfe: recRequestDto.enviarBandeira,
    listLoteVendaIaItem: recRequestDto.listLoteVendaIaItem,
    whatsApp: recRequestDto.whatsApp,
    status: 'AGUARDANDO',
    uuid: recRequestDto.uuid,
    origemGeracao: recRequestDto.origemGeracao,
  };

  // const lote: LoteRectoDTO = {
  //   ...recDto,
  //   status: recDto.status ?? 'AGUARDANDO',
  //   uuid: uuid.v4(),
  // };

  if (fila.length > 0) {
    fila.forEach(v => {
      if (v.listLoteVendaIaItem != undefined)
        v.listLoteVendaIaItem.forEach(i => {
          i.uuid = uuid.v4();
        });
    });
  }

  fila.push(recDtoLote);

  console.log('salvou lote na fila');
  console.log(fila);

  assert.deepEqual(fila[0].status, 'AGUARDANDO');
  assert.deepEqual(fila[0].uuid, uuidGerado);
});

// import {
//   adicionarNaFila,
//   atualizarNaFila,
//   getFila,
//   removerDaFila,
//   removerTudo,
// } from './service_mocked/QueueStorage';

// beforeEach(() => {
//   removerTudo();
// });

// test('recuperar_lotes', async () => {
//   const recDto = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//   };

//   adicionarNaFila(recDto);

//   const lotes = getFila();

//   assert.deepEqual(lotes[0], recDto);
// });

// test('enviar_lote', async () => {
//   const recDto: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//     status: 'AGUARDANDO',
//   };

//   adicionarNaFila(recDto);

//   const fila = getFila();
//   const itemBuscado = fila.find(item => item.whatsApp === recDto.whatsApp);

//   assert.equal(itemBuscado?.status, 'AGUARDANDO');
// });

// test('processar_lote_quando_possivel', async () => {
//   const recDto: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//   };

//   adicionarNaFila(recDto);

//   const uuid = '12345';

//   //enviei e tive a resposta
//   atualizarNaFila({
//     status: 'EM_PROCESSAMENTO',
//     uuid: uuid,
//     whatsApp: recDto.whatsApp,
//   });

//   const fila = getFila();
//   const itemAtualizado = fila.find(item => item.whatsApp === recDto.whatsApp);

//   assert.equal(itemAtualizado?.uuid, uuid);
// });

// test('remover_lote_por_uuid', async () => {
//   const recDto: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//     status: 'AGUARDANDO',
//     uuid: '12345',
//   };

//   adicionarNaFila(recDto);

//   removerDaFila({uuid: recDto.uuid});

//   const fila = getFila();
//   const itemRemovido = fila.find(item => item.uuid === recDto.uuid);

//   assert.equal(itemRemovido, undefined);
// });

// test('remover_lote_por_whatsapp', async () => {
//   const recDto: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//     status: 'AGUARDANDO',
//     uuid: '12345',
//   };

//   adicionarNaFila(recDto);

//   removerDaFila({whatsApp: recDto.whatsApp});

//   const fila = getFila();
//   const itemRemovido = fila.find(item => item.whatsApp === recDto.whatsApp);

//   assert.equal(itemRemovido, undefined);
// });

// test('nao_remover_lote_por_whatsapp_se_esta_processando', async () => {
//   const recDto: LoteRectoDTO = {
//     bandeira: true,
//     enviarNfe: false,
//     whatsApp: '12345678910',
//     listTpRecebimento: [
//       {
//         tpBandeira: TpBandeira.ALELO,
//         tpRecebimento: TipoRecebimento.CARTAO_CRED,
//         vrRecebimento: 10,
//       },
//     ],
//     status: 'EM_PROCESSAMENTO',
//     uuid: '12345',
//   };

//   adicionarNaFila(recDto);

//   removerDaFila({whatsApp: recDto.whatsApp});

//   const fila = getFila();
//   const itemBuscado = fila.find(item => item.whatsApp === recDto.whatsApp);

//   assert.notEqual(itemBuscado, undefined);
// });

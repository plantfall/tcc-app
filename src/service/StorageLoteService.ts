import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EnvioLoteResponse,
  LoteRecebimentoRequestDto,
  LoteStatus,
  ConsultaLoteResponse,
  LoteRecebimento,
} from '../@types/Recebimento.types';
import {ConsultaLoteResponseToLoteRecebimento} from '../mapper/ConsultaLoteResponseMapper';

const FILA_KEY = '@fila';

export class StorageLoteService {
  async excluiTudo() {
    await AsyncStorage.removeItem(FILA_KEY);
    console.log('removeu tudo');
  }
  async salvaLoteNaFila(
    recDtoRequst: LoteRecebimentoRequestDto,
    situacao: ConsultaLoteResponse,
    recDtoResponse: EnvioLoteResponse,
  ): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(FILA_KEY);
      const fila: LoteRecebimento[] = raw ? JSON.parse(raw) : [];

      const recDtoLote: LoteRecebimento = {
        enviarBandeira: recDtoRequst.enviarBandeira,
        enviarNfe: recDtoRequst.enviarBandeira,
        listLoteVendaIaItem: recDtoRequst.listLoteVendaIaItem,
        whatsApp: recDtoRequst.whatsApp,
        status: situacao.status,
        uuid: situacao.uuid,
        origemGeracao: recDtoRequst.origemGeracao,
        num: recDtoResponse.num,
        vrTotalRecebimentos: situacao.vrTotalRecebimentos,
        idLogin: situacao.idLogin,
        idLoginUltAlteracao: situacao.idLoginUltAlteracao,
        idPartGer: situacao.idPartGer,
        dtCriacao: situacao.dtCriacao,
        dtUltModificacao: situacao.dtUltModificacao,
        contadorModificacoes: 0,
      };

      fila.unshift(recDtoLote);
      await AsyncStorage.setItem(FILA_KEY, JSON.stringify(fila));
      console.log('salvou lote na fila');

      console.log(fila);
    } catch (error) {
      throw new Error('Erro ao salvar lote na fila:' + error);
    }
  }

  async salvaOuAtualizaLotes(lotesDoUsuarioFromApi: ConsultaLoteResponse[]) {
    try {
      const lotesDaFila = await this.extraiLoteDaFila();

      // 2. Separo os lotes em: existentes (para atualizar) e novos (para adicionar)
      const {lotesParaAtualizar, lotesParaAdicionar} =
        lotesDoUsuarioFromApi.reduce(
          (acc, loteApi) => {
            const existeNaFila = lotesDaFila.some(
              loteFila => loteFila.uuid === loteApi.uuid,
            );
            if (existeNaFila) {
              acc.lotesParaAtualizar.push(loteApi);
            } else {
              acc.lotesParaAdicionar.push(loteApi);
            }
            return acc;
          },
          {
            lotesParaAtualizar: [] as ConsultaLoteResponse[],
            lotesParaAdicionar: [] as ConsultaLoteResponse[],
          },
        );

      // 3. Atualizando lotes existentes
      if (lotesParaAtualizar.length > 0) {
        console.log(
          `Encontrados ${lotesParaAtualizar.length} lotes para atualizar`,
        );

        const filaAtualizada = lotesDaFila.map(loteFila => {
          const loteAtualizado = lotesParaAtualizar.find(
            l => l.uuid === loteFila.uuid,
          );
          return loteAtualizado
            ? {
                ...loteFila,
                status: loteAtualizado.status,
                dtUltModificacao: loteAtualizado.dtUltModificacao,
                listLoteVendaIaItem: loteAtualizado.listLoteVendaIaItem,
              }
            : loteFila;
        });

        await AsyncStorage.setItem(FILA_KEY, JSON.stringify(filaAtualizada));
      }

      if (lotesParaAdicionar.length > 0) {
        console.log(
          `Encontrados ${lotesParaAdicionar.length} novos lotes para adicionar`,
        );

        for (const lote of lotesParaAdicionar) {
          await this.salvaLoteNaFilaFromApi(lote);
        }
      }

      console.log('Operação de atualização de lotes concluída com sucesso');
    } catch (error) {
      console.error('Erro ao salvar/atualizar lotes:', error);
      throw new Error(`Erro ao salvar/atualizar lotes: ${error}`);
    }
  }

  async salvaLoteNaFilaFromApi(lote: ConsultaLoteResponse): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(FILA_KEY);
      const fila: LoteRecebimento[] = raw ? JSON.parse(raw) : [];

      const recDtoLote = ConsultaLoteResponseToLoteRecebimento(lote);
      fila.unshift(recDtoLote);

      await AsyncStorage.setItem(FILA_KEY, JSON.stringify(fila));
      console.log('Salvou lote novo na fila:', recDtoLote);
    } catch (error) {
      throw new Error('Erro ao salvar lote na fila: ' + error);
    }
  }

  async extraiLoteDaFila(): Promise<LoteRecebimento[]> {
    try {
      const raw = await AsyncStorage.getItem(FILA_KEY);
      const fila: LoteRecebimento[] = raw ? JSON.parse(raw) : [];
      return fila;
    } catch (error) {
      console.error('Erro ao extrair fila:', error);
      return [];
    }
  }

  async atualizaLoteNaFila(
    uuid: string,
    status: LoteStatus,
    danfe?: string,
    xml?: string,
    nomeFile?: string,
  ): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(FILA_KEY);
      const fila: LoteRecebimento[] = raw ? JSON.parse(raw) : [];
      const index = fila.findIndex(item => item.uuid === uuid);

      if (index === -1) {
        throw new Error(`Item com uuid ${uuid} não encontrado`);
      }

      fila[index] = {
        ...fila[index],
        status: status,
      };
      //

      await AsyncStorage.setItem(FILA_KEY, JSON.stringify(fila));
    } catch (error) {
      throw new Error('Erro ao atualizar lote: ' + error);
    }
  }

  async removeLoteDaFila(uuid: string, status: LoteStatus): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(FILA_KEY);
      const fila: LoteRecebimento[] = raw ? JSON.parse(raw) : [];

      console.log('📦 Fila anterior:', fila);

      if (status == 'PROCESSAMENTO' || status == 'CONCLUIDO') {
        console.log('nao pode remover');
        return;
      }

      if (fila.length === 0) return;

      const novaFila = fila.filter(item => {
        const mesmoUuid = uuid && item.uuid === uuid;

        // Remove se bater com qualquer identificador informado
        return !mesmoUuid;
      });

      console.log('🧹 Nova fila (após remoção):', novaFila);

      await AsyncStorage.setItem(FILA_KEY, JSON.stringify(novaFila));
      console.log('✅ Lote removido com sucesso.');
    } catch (error) {
      console.error('❌ Falha ao remover lote:', error);
      throw new Error('Erro ao remover lote: ' + error);
    }
  }
}

import {useFocusEffect} from '@react-navigation/native';
import {useState, useCallback, useContext} from 'react';
import {
  ConsultaLoteResponse,
  LoteRecebimento,
  LoteStatus,
} from '../../@types/Recebimento.types';
import {RecebimentoService} from '../../service/RecebimentoService';
import {StorageLoteService} from '../../service/StorageLoteService';
import {AuthService} from '../../service/AuthService';

const statusList: (LoteStatus | 'TODOS')[] = [
  'TODOS',
  'SALVO',
  'PROCESSAMENTO',
  'CONCLUIDO',
  'FALHA_PROCESSAMENTO',
  'CANCELADO',
];

export function useScreenListarNotasDoLote() {
  const [lancamentos, setLancamentos] = useState<LoteRecebimento[]>([]);

  const storageLoteService = new StorageLoteService();

  const recService = new RecebimentoService();
  const [loading, setLoading] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<LoteStatus | 'TODOS'>(
    'TODOS',
  );
  const [dataInicial, setDataInicial] = useState<Date | null>(null);
  const [dataFinal, setDataFinal] = useState<Date | null>(null);
  const [showDataInicial, setShowDataInicial] = useState(false);
  const [showDataFinal, setShowDataFinal] = useState(false);

  const adminMode = !true;

  useFocusEffect(
    useCallback(() => {
      console.log('tela em foco — carregando lotes');

      const fetchLotes = async () => {
        try {
          console.log('>>token');
          console.log(token);

          const lotesDaFila = await storageLoteService.extraiLoteDaFila();
          setLancamentos(lotesDaFila);

          //const lotesDoUsuarioFromApi = await recService.lotesDoUsuario(token);
          const lotesDoUsuarioFromApi = LotesDoUsuario;
          //setLoading(true);
          //17
          console.log('lotesDoUsuarioFromApi');
          console.log(lotesDoUsuarioFromApi);

          await storageLoteService.salvaOuAtualizaLotes(lotesDoUsuarioFromApi);

          // await Promise.all(
          //   lotesDaFila.map(async it => {
          //     try {
          //       if (
          //         it.status === 'CANCELADO' ||
          //         it.status === 'CONCLUIDO' ||
          //         it.status === 'FALHA_PROCESSAMENTO'
          //       )
          //         return;

          //       if (it.contadorModificacoes === 3) return;

          //       const resp = await recService.consultaSituacao(it.uuid, token);
          //       const novoStatus: LoteStatus = resp.status;

          //       if (novoStatus !== it.status) {
          //         it.contadorModificacoes += 1;
          //         it.listLoteVendaIaItem = resp.listLoteVendaIaItem;

          //         await storageLoteService.atualizaLoteNaFila(
          //           it.uuid,
          //           novoStatus,
          //         );
          //       }
          //     } catch (e) {
          //       console.log('erro ao buscar lotes: ' + e);
          //     }
          //   }),
          // );

          //

          console.log(lotesDaFila);

          const filaAtualizada = await storageLoteService.extraiLoteDaFila();
          setLancamentos(filaAtualizada);
        } catch (e: any) {
          setLancamentos([]);
          console.log(e);

          const status = e.status;
          if (status != undefined) {
            if (status == 401) {
              const authService = new AuthService();
              // await authService.relogin()
              //recarregaToken()
            }
          }
        } finally {
          setLoading(false);
        }
      };

      fetchLotes();
    }, []),
  );

  const filtraPorData = (item: LoteRecebimento) => {
    const itemDate = new Date(item.dtUltModificacao);

    // Zera hora, minuto, segundo e milissegundo de dataInicial
    const dataIni = dataInicial
      ? new Date(
          dataInicial.getFullYear(),
          dataInicial.getMonth(),
          dataInicial.getDate(),
        )
      : null;

    // Ajusta dataFinal para o final do dia
    const dataFin = dataFinal
      ? new Date(
          dataFinal.getFullYear(),
          dataFinal.getMonth(),
          dataFinal.getDate(),
          23,
          59,
          59,
          999,
        )
      : null;

    if (dataIni && itemDate < dataIni) return false;
    if (dataFin && itemDate > dataFin) return false;
    return true;
  };

  const lancamentosFiltrados =
    filtroStatus === 'TODOS'
      ? lancamentos.filter(filtraPorData)
      : lancamentos.filter(
          item => item.status === filtroStatus && filtraPorData(item),
        );

  return {
    lancamentos,
    loading,
    adminMode,
    storageLoteService,
    dataInicial,
    dataFinal,
    filtraPorData,
    filtroStatus,
    showDataFinal,
    showDataInicial,
    lancamentosFiltrados,
    statusList,
    setFiltroStatus,
    setShowDataInicial,
    setShowDataFinal,
    setDataInicial,
    setDataFinal,
  };
}

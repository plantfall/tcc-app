import {DefaultApiProvider} from './DefaultApiProvider';
import {
  EnvioLoteResponse,
  LoteRecebimentoRequestDto,
  ConsultaLoteResponse,
  DownloadNfeResponse,
} from '../@types/Recebimento.types';
import {isAxiosError} from 'axios';

export type NfeProc = {
  nfeProc: string;
};

export class RecebimentoService extends DefaultApiProvider {
  public async enviarLoteDeRecebimento(
    lote: LoteRecebimentoRequestDto,
  ): Promise<EnvioLoteResponse> {
    console.log('processando lote');

    try {
      await this.init();
      console.log('vai enviar');
      const req = await this.api.post('/vendaia', lote, this.header());

      const resp: EnvioLoteResponse = req.data;

      console.log('Resposta do servidor:');
      console.log(resp);

      return resp;
    } catch (e) {
      console.log(e);
      const message: string = (e as any)?.response?.data;
      console.log(message);
      throw new Error(message);
    }
  }

  public async consultaSituacao(
    uuid: string,
    token: string,
  ): Promise<ConsultaLoteResponse> {
    try {
      const req = await this.api.get(`/vendaia/situacaoLote?uuid=${uuid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const resp: ConsultaLoteResponse = req.data;

      console.log('Resposta do servidor, consulta situacao:');
      console.log(resp);

      return resp;
    } catch (e) {
      const message: string = (e as any)?.response?.data;
      console.log(message);
      throw new Error(message);
    }
  }

  public async lotesDoUsuario(token: string): Promise<ConsultaLoteResponse[]> {
    try {
      const req = await this.api.get(`vendaia/listar-todos-lotes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const resp: ConsultaLoteResponse[] = req.data.lotes;

      console.log('Resposta do servidor, lotes do usuario:');
      console.log(resp);

      return resp;
    } catch (e: any) {
      console.log(e);

      if (isAxiosError(e)) {
        const statusCode = e.response?.status;
        console.log('Erro em buscar lotes:', statusCode, e.message);
        throw {status: statusCode, message: e.message};
      }
      throw new Error(e);
    }
  }

  public async downloadDanfe(chaveNfe: string): Promise<DownloadNfeResponse> {
    try {
      const req = await this.api.get(
        `/nfeEmissaoPropria/print-nfe?chaveNfe=${chaveNfe}`,
        this.header(),
      );

      const resp: DownloadNfeResponse = req.data;

      console.log('Resposta do servidor, consulta situacao:');
      console.log(resp);

      return resp;
    } catch (e) {
      const message: string = (e as any)?.response?.data;
      console.log(message);
      throw new Error(message);
    }
  }

  public async downloadXml(chaveNfe: string): Promise<NfeProc> {
    try {
      const req = await this.api.get(
        `/nfeEmissaoPropria/downloadChave?decompress=true&chaveNfe=${chaveNfe}`,
        this.header(),
      );

      const resp: NfeProc = req.data;

      console.log('Resposta do servidor, consulta situacao:');
      console.log(resp);

      return resp;
    } catch (e) {
      const message: string = (e as any)?.response?.data;
      console.log(message);
      throw new Error(message);
    }
  }
}

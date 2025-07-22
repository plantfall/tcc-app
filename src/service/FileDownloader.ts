import RNFS from 'react-native-fs';

export class FileDownloader {
  async saveFile(base64: string, nome: string) {
    try {
      const path = `${RNFS.DownloadDirectoryPath}/${nome}${'.pdf'}`;
      await RNFS.writeFile(path, base64, 'base64');
      console.log('Arquivo salvo em:', path);
      return path;
    } catch (e) {
      throw new Error('erro ao baixar danfe: ' + e);
    }
  }

  async saveXmlFile(xml: string, nomeArquivo: string): Promise<string> {
    const path = `${RNFS.DownloadDirectoryPath}/${nomeArquivo}.xml`;

    try {
      await RNFS.writeFile(path, xml, 'utf8');
      console.log('XML salvo em:', path);
      return path;
    } catch (e) {
      console.error('Erro ao salvar/abrir XML:', e);
      throw new Error('Erro ao salvar/abrir XML: ' + e);
    }
  }
}

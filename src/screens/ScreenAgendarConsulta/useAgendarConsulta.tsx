import {useEffect, useState} from 'react';

export type Especializacao =
  | 'CLINICO_GERAL'
  | 'MEDICO'
  | 'CLINICO_GERAL_PEDIATRA';

export type Especialista = {
  nome: string;
  especializacao: Especializacao;
};

export default function ScreenConfimacaoHook() {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);

  useEffect(() => {
    async function buscarEspecialistas() {
      //
      const list: Especialista[] = [
        {
          nome: 'Dra.Gabriela Garcia',
          especializacao: 'CLINICO_GERAL',
        },
        {
          nome: 'Dra.Isabel Matos',
          especializacao: 'CLINICO_GERAL_PEDIATRA',
        },
      ];
      setEspecialistas(list);
    }

    buscarEspecialistas();
  }, []);

  const [loading, setLoading] = useState(false);

  return {
    loading,
    especialistas,
  };
}

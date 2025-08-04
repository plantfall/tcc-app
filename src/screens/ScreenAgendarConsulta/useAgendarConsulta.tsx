import {useEffect, useState} from 'react';

export type Especializacao =
  | 'CLINICO_GERAL'
  | 'MEDICO'
  | 'CLINICO_GERAL_PEDIATRA';

export type Especialista = {
  nome: string;
  especializacao: Especializacao;
};

export default function useAgendarConsulta() {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const turnDatePickerOn = () => {
    setShowDatePicker(true);
  };

  const turnDatePickerOff = () => {
    setShowDatePicker(false);
  };

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

  return {
    loading,
    especialistas,
    dateSelected,
    setDateSelected,
    showDatePicker,
    turnDatePickerOn,
    turnDatePickerOff,
  };
}

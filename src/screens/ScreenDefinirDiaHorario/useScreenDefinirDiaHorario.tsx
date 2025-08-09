import {useEffect, useState} from 'react';

export default function useScreenDefinirDiaHorario() {
  const [diasDisponiveis, setDiasDisponiveis] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function buscarDiasDisponiveis() {
      //
      const list: string[] = [
        '11-08-2025',
        '12-08-2025',
        '15-08-2025',
        '18-08-2025',
        '21-08-2025',
        '27-08-2025',
        '28-08-2025',
        '29-08-2025',
      ];
      setDiasDisponiveis(list);
    }

    buscarDiasDisponiveis();
  }, []);

  return {
    loading,
    diasDisponiveis,
    dateSelected,
    setDateSelected,
  };
}

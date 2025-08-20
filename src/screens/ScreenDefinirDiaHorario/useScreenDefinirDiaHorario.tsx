import {useEffect, useState} from 'react';

export default function useScreenDefinirDiaHorario() {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [loading, setLoading] = useState(false);

  return {
    loading,
    dateSelected,
    setDateSelected,
  };
}

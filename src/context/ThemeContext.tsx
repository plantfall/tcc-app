import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme} from '../ui/theme/dark';
import {lightTheme} from '../ui/theme/light';

export type ThemeType = typeof lightTheme;

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
  // loadThemePref não precisa mais estar no contexto, pois será chamado internamente
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: async () => {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDark, setIsDark] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const THEME_KEY = '@theme';

  const saveThemePref = async (newIsDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newIsDark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Erro ao salvar o tema:', e);
    }
  };

  const loadThemePref = async () => {
    try {
      const resp = await AsyncStorage.getItem(THEME_KEY);
      const isDarkLoaded = resp === 'dark'; // True se for 'dark', False caso contrário (incluindo null)
      setIsDark(isDarkLoaded);
      //setIsDark(false);
    } catch (e) {
      console.warn('Erro ao carregar o tema:', e);
      // Em caso de erro, usamos o tema padrão (light)
      setIsDark(false);
    } finally {
      // 🚨 IMPORTANTE: Marcar como carregado DEPOIS de tentar ler
      setIsThemeLoaded(true);
    }
  };

  useEffect(() => {
    loadThemePref();
  }, []);

  const toggleTheme = async () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    await saveThemePref(nextIsDark);
  };

  // --- Renderização ---

  const theme = isDark ? darkTheme : lightTheme;

  // Se o tema ainda não foi carregado, mostramos um indicador de carregamento ou null
  if (!isThemeLoaded) {
    // Você pode retornar um <ActivityIndicator /> ou null, dependendo do que prefere
    return null;
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

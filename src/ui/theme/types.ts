// Defina o tipo de chave que você aceita
type ThemeWeightKey = 'regular' | 'bold';

// Defina o tipo de valor do fontWeight que é compatível com o React Native
type ReactNativeFontWeight = '400' | '700' | 'normal' | 'bold';
// Adicione mais se necessário, mas '400' e '700' são suficientes para seu exemplo.

// 2. Tipagem do Objeto Typography
export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: number;
    medium: number;
    large: number;
    title: number;
  };
  // Garante que o objeto FontWeight tenha as chaves esperadas (regular/bold)
  // e que os valores (ex: '400') sejam compatíveis com o tipo do React Native.
  fontWeight: Record<ThemeWeightKey, ReactNativeFontWeight>;
}

export interface Theme {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    textSecondary: string;
  };
  typography: ThemeTypography;
}

import {Theme} from './types';

// Seu tema agora é tipado com a interface Theme:
export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#1E1E1E',
    textSecondary: '#002230',
    textLabel: '#6A6868',
    primary: '#1B8CB9',
    secondary: '#FF9500',
  },
  typography: {
    fontFamily: 'Inter-Regular',
    fontSize: {
      tiny: 12,
      small: 14,
      medium: 16,
      large: 20,
      title: 28,
    },
    fontWeight: {
      regular: '400',
      bold: '700',
    },
  },
};

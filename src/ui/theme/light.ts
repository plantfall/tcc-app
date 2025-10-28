import {Theme} from './types';

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    backgroundVariant: '#F5F5F5',
    text: '#1E1E1E',
    textSecondary: '#002230',
    textSecondaryVariant: '#021E2A',
    textLabel: '#6A6868',
    textLabelVariant: '#2C2B2B',
    textLabelSecondVariant: '#4F4F4F',
    //#8E8E8E
    primary: '#1B8CB9',
    secondary: '#BAE6C9',
    border: '#D9D9D9',
  },
  typography: {
    fontFamily: 'Inter-Regular',
    fontSize: {
      tiny: 12,
      small: 14,
      medium: 16,
      large: 20,
      title: 22,
      extraLarge: 26,
    },
    fontWeight: {
      regular: '400',
      bold: '700',
    },
  },
};

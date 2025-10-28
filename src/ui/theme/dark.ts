import {Theme} from './types';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    // Fundo Principal: Escuro (base para a tela)
    background: '#121212',

    // Texto Principal: Claro
    text: '#E0E0E0',

    // Texto Secundário: Um pouco mais apagado que o principal
    textSecondary: '#002230',

    // Texto de Label/Hint: Tons de cinza mais sutis
    textLabel: '#6A6A6A',
    textLabelVariant: '#8D8D8D',
    textLabelSecondVariant: '#9E9E9E',

    // Cor Principal (Primary): A cor de destaque, mantendo o tom azul/ciano
    primary: '#4FC3F7', // Ciano claro que se destaca no fundo escuro

    // Cor Secundária (Secondary): Cor de suporte (verde claro/menta)
    secondary: '#D4F5E4', // Verde claro/menta para contraste
    border: '#D9D9D9',
  },
  typography: {
    // Mantém a mesma família de fontes
    fontFamily: 'Inter-Regular',

    // Mantém o mesmo mapa de tamanhos de fonte
    fontSize: {
      tiny: 12,
      small: 14,
      medium: 16,
      large: 20,
      title: 22,
      extraLarge: 26,
    },

    // Mantém os mesmos pesos de fonte
    fontWeight: {
      regular: '400',
      bold: '700',
    },
  },
};

export const GreenColor = '#BAE6C9';
export const BlueColor = '#1B8CB9';

export const theme = {
  secondondaryColor: '#021E2A',
  blueColor: '#1B8CB9',
  line: '#D9D9D9',
};

export class AppUtils {
  static TestMode = true;

  static PlaceholderTextColor = '#808080';
  static FontSize = 14;
  static FontSizeMedium = 16;
  static FontSizeGrande = 18;
  static FontColor = '#000';
  static FontFamily: 'Poppins-Light';
  static LightBlue: '#1B8CB9';
  static Gradient = [
    '#fff',
    '#DFEFF5',
    '#BFDFEB',
    '#80BFD8',
    '#1B8CB9',
    '#1B8CB9',
  ];
  static Padding = 15;

  static MoedaBrasileira(valor: number) {
    return Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  static FormatarWhatsApp(phone: string) {
    if (!phone) return '';

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  }
}

export const isEmpty = (value: string) => {
  return value.trim() == '';
};

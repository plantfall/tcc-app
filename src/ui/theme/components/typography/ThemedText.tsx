// src/components/typography/ThemedText.tsx

import {Text, TextProps, TextStyle} from 'react-native';

import React from 'react';
import {useTheme} from '../../../../context/ThemeContext';

export type Weight = 'regular' | 'bold';

export interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: Weight;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export const ThemedText = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children, size, weight = 'regular', color, style, ...rest} = props;

  return (
    <Text
      style={[
        {
          color: color ?? theme.colors.text,
          fontFamily: theme.typography.fontFamily,
          fontSize: size ?? theme.typography.fontSize.small,
          fontWeight: theme.typography.fontWeight[weight],
        },
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

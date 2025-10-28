import {ThemedText, ThemedTextProps} from './ThemedText';

import React from 'react';
import {useTheme} from '../../../../context/ThemeContext';

export const Title: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  return (
    <ThemedText size={theme.typography.fontSize.title} weight="bold">
      {children}
    </ThemedText>
  );
};

export const Subtitle = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children, weight} = props;

  return (
    <ThemedText
      size={theme.typography.fontSize.large}
      weight={weight}
      color={theme.colors.textSecondary}>
      {children}
    </ThemedText>
  );
};

export const Body: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  return (
    <ThemedText size={theme.typography.fontSize.medium} weight="regular">
      {children}
    </ThemedText>
  );
};

export const Caption = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children} = props;

  return (
    <ThemedText
      size={theme.typography.fontSize.small}
      weight="regular"
      color={theme.colors.textSecondary}>
      {children}
    </ThemedText>
  );
};

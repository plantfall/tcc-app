import {ThemedText, ThemedTextProps} from './ThemedText';

import React from 'react';
import {useTheme} from '../../../../context/ThemeContext';

export const H1: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  return (
    <ThemedText size={theme.typography.fontSize.extraLarge} weight="bold">
      {children}
    </ThemedText>
  );
};

export const Title: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  return (
    <ThemedText size={theme.typography.fontSize.large} weight="bold">
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

export const Body = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children} = props;

  return (
    <ThemedText
      size={theme.typography.fontSize.medium}
      weight={props.weight ?? 'regular'}
      color={props.color}>
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
      color={props.color ?? theme.colors.textSecondary}>
      {children}
    </ThemedText>
  );
};

export const Label = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children} = props;

  return (
    <ThemedText
      size={theme.typography.fontSize.small}
      weight="regular"
      color={theme.colors.textLabel}>
      {children}
    </ThemedText>
  );
};

export const StatusText = (props: ThemedTextProps) => {
  const {theme} = useTheme();
  const {children} = props;

  return (
    <ThemedText
      size={theme.typography.fontSize.tiny}
      weight="regular"
      color={props.color ?? theme.colors.text}>
      {children}
    </ThemedText>
  );
};

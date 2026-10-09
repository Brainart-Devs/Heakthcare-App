import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Typography as ThemeTypography, useThemeColor } from '@/constants/theme';

export interface TextProps extends RNTextProps {
  variant?: keyof typeof ThemeTypography;
  color?: string;
  align?: 'left' | 'center' | 'right';
  secondary?: boolean;
}

export function Text({ 
  style, 
  variant = 'body', 
  color, 
  align = 'left', 
  secondary = false,
  ...rest 
}: TextProps) {
  const theme = useThemeColor();
  
  const textStyle = [
    ThemeTypography[variant],
    { color: color || (secondary ? theme.textSecondary : theme.text) },
    { textAlign: align },
    style,
  ];

  return <RNText style={textStyle} {...rest} />;
}

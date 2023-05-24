import { ReactNode } from 'react';
import { Text as TextReactNative, TextStyle } from 'react-native';

interface TextProps {
  size?: number;
  color?: string;
  opacity?: number;
  style?: TextStyle;
  children: ReactNode;
  weight?: '400' | '600' | '700';
}

export const Text = ({
  size,
  color,
  style,
  weight,
  opacity,
  children,
}: TextProps) => {
  const styleText = {
    ...style,
    opacity: opacity || 1,
    color: color || '#333',
    fontSize: size ? size : 16,
    fontFamily: weight ? `GeneralSans-${weight}` : 'GeneralSans-400',
  };

  return <TextReactNative style={styleText}>{children}</TextReactNative>;
};

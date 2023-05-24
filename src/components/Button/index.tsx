import { Text } from '../Text';
import { styles } from './styles';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export const Button = ({
  loading,
  disabled,
  children,
  onPress,
}: ButtonProps) => {
  const backgroundColor = disabled ? '#999999' : '#D73035';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, { backgroundColor }]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text color="#ffffff" weight="600">
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

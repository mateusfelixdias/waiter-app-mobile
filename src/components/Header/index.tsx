import { Text } from '../Text';
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export const Header = ({ selectedTable, onCancelOrder }: HeaderProps) => {
  return (
    <View style={styles.container}>
      {!selectedTable.length ? (
        <>
          <Text opacity={0.9}>Bem vindo(a) ao</Text>

          <Text size={24} weight="700">
            WAITER<Text size={24}>APP</Text>
          </Text>
        </>
      ) : (
        <View style={styles.orderContent}>
          <View style={styles.orderHeader}>
            <Text size={24} weight="600">
              Pedido
            </Text>

            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} weight="600" color="#D73035">
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.table}>
            <Text color="#666">Mesa {selectedTable}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

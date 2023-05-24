import { Text } from '../Text';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { CheckCircle } from '../Icons/CheckCircle';
import { Modal, TouchableOpacity, View } from 'react-native';

interface ModalOfTheOrderConfirmedProps {
  visible: boolean;
  onOk: () => void;
}

export const ModalOfTheOrderConfirmed = ({
  visible,
  onOk,
}: ModalOfTheOrderConfirmedProps) => {
  return (
    <Modal visible={visible} animationType="fade">
      <StatusBar style="light" />

      <View style={styles.container}>
        <CheckCircle />

        <Text color="#fff" size={20} weight="600" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>

        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <TouchableOpacity style={styles.okButton} onPress={onOk}>
          <Text color="#D73035" weight="600">
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

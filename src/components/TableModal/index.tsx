import { Text } from '../Text';
import { useState } from 'react';
import { styles } from './styles';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import {
  View,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const isAndroid = Platform.OS === 'android';
const behavior = isAndroid ? 'height' : 'padding';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export const TableModal = ({ visible, onClose, onSave }: TableModalProps) => {
  const [table, setTable] = useState('');

  const handleSave = () => {
    onClose();
    setTable('');
    onSave(table);
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <KeyboardAvoidingView behavior={behavior} style={styles.overlay}>
        <View style={styles.modalBody}>
          <View style={styles.header}>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={setTable}
              keyboardType="number-pad"
              placeholder="Número dá mesa"
              placeholderTextColor="#666666"
            />

            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

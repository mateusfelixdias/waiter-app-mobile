import { Text } from '../Text';
import { styles } from './styles';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { IProduct } from '../../interfaces/product';
import { currencyFormat } from '../../utils/currencyFormat';
import {
  View,
  Modal,
  FlatList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

interface ProductModalProps {
  visible: boolean;
  product: IProduct;
  onClose: () => void;
  onAddToCart: (product: IProduct) => void;
}

interface IngredientsProps {
  _id: string;
  icon: string;
  name: string;
}

export const ProductModal = ({
  product,
  visible,
  onClose,
  onAddToCart,
}: ProductModalProps) => {
  const uri = `http://10.0.0.9:3000/uploads/${product.imagePath}`;

  const handleAddToCart = () => {
    onClose();
    onAddToCart(product);
  };

  const renderItem = ({ icon, name }: IngredientsProps) => {
    return (
      <View style={styles.ingredients}>
        <Text>{icon}</Text>

        <Text size={16} color="#666" style={{ marginLeft: 20 }}>
          {name}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <ImageBackground source={{ uri }} style={styles.image}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Close />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.modalBody}>
        <View style={styles.header}>
          <Text size={24} weight="600">
            {product.name}
          </Text>

          <Text color="#666">{product.description}</Text>
        </View>

        {product.ingredients?.length ? (
          <View style={styles.ingredientsContainer}>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={({ _id }) => _id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <SafeAreaView style={styles.footerContainer}>
          <View>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {currencyFormat(product.price)}
            </Text>
          </View>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

import { Text } from '../Text';
import { useState } from 'react';
import { styles } from './styles';
import { ProductModal } from '../ProductModal';
import { PlusCircle } from '../Icons/PlusCircle';
import { IProduct } from '../../interfaces/product';
import { currencyFormat } from '../../utils/currencyFormat';
import { FlatList, View, Image, TouchableOpacity } from 'react-native';

interface MenuProps {
  products: IProduct[];
  onAddToCart: (product: IProduct) => void;
}

export const Menu = ({ products, onAddToCart }: MenuProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(
    {} as IProduct
  );

  const handleOpenModal = (product: IProduct) => {
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const renderItem = (product: IProduct) => {
    const uri = `http://10.0.0.9:3000/uploads/${product.imagePath}`;

    return (
      <TouchableOpacity
        style={styles.product}
        onPress={() => handleOpenModal(product)}
      >
        <Image style={styles.productImage} source={{ uri }} />

        <View style={styles.productDetails}>
          <Text weight="600">{product.name}</Text>

          <Text color="#666666" size={14} style={{ marginVertical: 8 }}>
            {product.description}
          </Text>

          <Text size={14} weight="600">
            {currencyFormat(product.price)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => onAddToCart(product)}
        >
          <PlusCircle />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const Separetor = () => <View style={styles.separator} />;

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <Separetor />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <ProductModal
        onClose={onClose}
        visible={isModalVisible}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

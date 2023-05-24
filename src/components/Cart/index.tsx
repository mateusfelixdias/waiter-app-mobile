import { Text } from '../Text';
import { useState } from 'react';
import { styles } from './styles';
import { Button } from '../Button';
import { api } from '../../services';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { IProduct } from '../../interfaces/product';
import { ICartItem } from '../../interfaces/cartItem';
import { currencyFormat } from '../../utils/currencyFormat';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ModalOfTheOrderConfirmed } from '../ModalOfTheOrderConfirmed';

interface CartProps {
  seletedTable: string;
  cartItem: ICartItem[];
  onConfirmedOrder: () => void;
  onDecrementToCart: (product: IProduct) => void;
  onIncrementToCart: (product: IProduct) => void;
}

export const Cart = ({
  cartItem,
  seletedTable,
  onConfirmedOrder,
  onDecrementToCart,
  onIncrementToCart,
}: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenModalOfTheOrderConfirmed, setIsOpenModalOfTheOrderConfirmed] =
    useState(false);

  const renderItem = (cartItem: ICartItem) => {
    const uri = `http://10.0.0.9:3000/uploads/${cartItem.product.imagePath}`;

    return (
      <View style={styles.cartItem}>
        <View style={styles.productContainer}>
          <Image source={{ uri }} style={styles.image} />

          <View style={styles.quantityContainer}>
            <Text size={14} color="#666">
              {cartItem.quantity}x
            </Text>
          </View>

          <View style={styles.productDetails}>
            <Text size={14} weight="600">
              {cartItem.product.name}
            </Text>

            <Text size={14} color="#666">
              {currencyFormat(cartItem.product.price)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              onIncrementToCart(cartItem.product);
            }}
          >
            <PlusCircle />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onDecrementToCart(cartItem.product);
            }}
          >
            <MinusCircle />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);

      const payload = {
        table: seletedTable,
        products: cartItem.map(({ product, quantity }) => ({
          quantity,
          product: product._id,
        })),
      };

      const { data, status } = await api.post('/orders', payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsOpenModalOfTheOrderConfirmed(true);
    }
  };

  const handleOk = () => {
    onConfirmedOrder();
    setIsOpenModalOfTheOrderConfirmed(false);
  };

  const isCartEmpty = cartItem.length === 0;

  const total = cartItem.reduce((acc, { product, quantity }) => {
    const { price } = product;

    return acc + price * quantity;
  }, 0);

  return (
    <>
      {!isCartEmpty ? (
        <FlatList
          data={cartItem}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
          style={{ marginBottom: 20, maxHeight: 150 }}
          keyExtractor={({ product: { _id } }) => _id}
        />
      ) : null}

      <View style={styles.summary}>
        <View style={styles.totalContainer}>
          {!isCartEmpty ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {currencyFormat(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </View>

        <Button
          loading={isLoading}
          disabled={isCartEmpty}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </View>

      <ModalOfTheOrderConfirmed
        onOk={handleOk}
        visible={isOpenModalOfTheOrderConfirmed}
      />
    </>
  );
};

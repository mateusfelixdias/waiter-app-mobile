import { api } from '../services';
import { styles } from './styles';
import { Text } from '../components/Text';
import { Cart } from '../components/Cart';
import { Menu } from '../components/Menu';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { IProduct } from '../interfaces/product';
import { Empty } from '../components/Icons/Empty';
import { ICategory } from '../interfaces/category';
import { ICartItem } from '../interfaces/cartItem';
import { TableModal } from '../components/TableModal';
import { Categories } from '../components/Categories';
import { categories as mocksCategories } from '../mocks/categories';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

export const Main = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cartItem, setCartItem] = useState<ICartItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>(mocksCategories);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

  const updateCartItem = (
    product: IProduct,
    cartItem: ICartItem[]
  ): ICartItem[] => {
    const productId = product._id;

    const existingProductIndex = cartItem.findIndex(({ product }) => {
      const { _id } = product;

      return _id === productId;
    });

    if (existingProductIndex === -1) {
      const data = { product, quantity: 1 };
      return [...cartItem, data];
    }

    const updatedCartItem = {
      ...cartItem[existingProductIndex],
      quantity: cartItem[existingProductIndex].quantity + 1,
    };

    const updatedCartItems = [...cartItem];
    updatedCartItems[existingProductIndex] = updatedCartItem;

    return updatedCartItems;
  };

  const decrementCartItem = (product: IProduct, cartItem: ICartItem[]) => {
    const productId = product._id;

    const existingProductIndex = cartItem.findIndex(({ product }) => {
      const { _id } = product;

      return _id === productId;
    });

    const existingCartItem = cartItem[existingProductIndex];

    if (existingCartItem.quantity === 1) {
      return cartItem.filter(({ product }) => product._id !== productId);
    }

    const updatedCartItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };

    const updatedCartItems = [...cartItem];
    updatedCartItems[existingProductIndex] = updatedCartItem;

    return updatedCartItems;
  };

  const onClose = () => {
    setIsTableModalVisible(false);
  };

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setCartItem([]);
    setSelectedTable('');
  };

  const handleAddToCart = (product: IProduct) => {
    if (!selectedTable) setIsTableModalVisible(true);

    setCartItem((prevState) => updateCartItem(product, prevState));
  };

  const handleIncrementToCart = (product: IProduct) => {
    setCartItem((prevState) => updateCartItem(product, prevState));
  };

  const handleDecrementToCart = (product: IProduct) => {
    setCartItem((prevState) => {
      return decrementCartItem(product, prevState) ?? prevState;
    });
  };

  const hanldeSelectCategory = async (categoryId: string) => {
    try {
      setIsLoadingProducts(true);

      const isCategoryId = !!categoryId;

      const routeProducts = '/products';
      const routeCategory = `/categories/${categoryId}/products`;

      const route = isCategoryId ? routeCategory : routeProducts;
      const { data, status } = await api.get(route);

      if (status === 200) setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const { data, status } = await api.get('/categories');

        if (status === 200) setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleProducts = async () => {
      try {
        const { data, status } = await api.get('/products');

        if (status === 200) setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    const functionForResolve = [handleProducts(), handleCategories()];
    Promise.all(functionForResolve).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator color="#D73035" size="large" />
          </View>
        ) : (
          <>
            <View style={styles.categoriesContainer}>
              <Categories
                categories={categories}
                onSelectCategory={hanldeSelectCategory}
              />
            </View>

            {isLoadingProducts ? (
              <View style={styles.centeredContainer}>
                <ActivityIndicator color="#D73035" size="large" />
              </View>
            ) : (
              <>
                {products.length > 0 ? (
                  <View style={styles.menuContainer}>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </View>
                ) : (
                  <View style={styles.centeredContainer}>
                    <Empty />

                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </SafeAreaView>

      <SafeAreaView>
        <View style={styles.footer}>
          {!selectedTable.length ? (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(true)}
            >
              Novo pedido
            </Button>
          ) : (
            <Cart
              cartItem={cartItem}
              seletedTable={selectedTable}
              onConfirmedOrder={handleResetOrder}
              onIncrementToCart={handleIncrementToCart}
              onDecrementToCart={handleDecrementToCart}
            />
          )}
        </View>
      </SafeAreaView>

      <TableModal
        onClose={onClose}
        onSave={handleSaveTable}
        visible={isTableModalVisible}
      />
    </>
  );
};

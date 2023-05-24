import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  product: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  productImage: {
    width: 120,
    height: 96,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 24,
    backgroundColor: 'rgba(204, 204, 204, 0.3)',
  },
  addToCartButton: {
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});

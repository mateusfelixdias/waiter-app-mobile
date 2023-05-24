import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actions: {
    gap: 24,
    flexDirection: 'row',
  },
  cartItem: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 48,
    height: 46,
    borderRadius: 6,
  },
  productContainer: {
    gap: 12,
    flexDirection: 'row',
  },
  quantityContainer: {
    minWidth: 20,
  },
  productDetails: {
    gap: 4,
  },
  summary: {
    gap: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
});

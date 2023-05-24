import { Platform, StyleSheet } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: isAndroid ? 24 : 0,
  },
  categoriesContainer: {
    height: 73,
    marginTop: 24,
  },
  menuContainer: {
    flex: 1,
  },
  footer: {
    minHeight: 100,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
});

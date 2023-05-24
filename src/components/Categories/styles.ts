import { StyleSheet, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const styles = StyleSheet.create({
  category: {
    marginLeft: 16,
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    elevation: 2,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: isAndroid ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.1)',
  },
});

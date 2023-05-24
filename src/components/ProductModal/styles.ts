import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    alignItems: 'flex-end',
  },
  header: {
    gap: 8,
  },
  closeButton: {
    width: 32,
    margin: 24,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
  },
  modalBody: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 32,
  },
  ingredients: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'center',
    borderStyle: 'solid',
    flexDirection: 'row',
    borderColor: 'rgba(204, 204, 204, 0.3)',
  },
  footer: {
    minHeight: 100,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  footerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

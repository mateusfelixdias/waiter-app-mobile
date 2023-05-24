import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBody: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  form: {
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    borderColor: 'rgba(204, 204, 204, 0.5)',
  },
});

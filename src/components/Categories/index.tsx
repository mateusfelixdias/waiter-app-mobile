import { Text } from '../Text';
import { useState } from 'react';
import { styles } from './styles';
import { ICategory } from '../../interfaces/category';
import { FlatList, TouchableOpacity, View } from 'react-native';

interface CategoriesProps {
  categories: ICategory[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export const Categories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  };

  const renderItem = ({ _id, icon, name }: ICategory) => {
    const isSelected = selectedCategory === _id;

    return (
      <TouchableOpacity
        style={styles.category}
        onPress={() => handleSelectCategory(_id)}
      >
        <View style={styles.icon} key={_id}>
          <Text opacity={isSelected ? 1 : 0.5}>{icon}</Text>
        </View>

        <Text size={16} weight="600" opacity={isSelected ? 1 : 0.5}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={({ _id }) => _id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={{ paddingRight: 16 }}
    />
  );
};

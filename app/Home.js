import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Portal,
  Provider,
  TextInput
} from 'react-native-paper';

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState({
    Love: ['I love you ❤️', 'Forever yours 💕'],
    Family: ['Family is everything 👨‍👩‍👧', 'Always together 🏠'],
    Friends: ['True friends stay 💬', 'Best buddies 🤝'],
    School: ['Study hard 📚', 'Dream big 🎓'],
  });

  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editedName, setEditedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setNewCategory('');
  };

  const showEditDialog = (category) => {
    setEditedName(category);
    setSelectedCategory(category);
    setEditVisible(true);
  };

  const hideEditDialog = () => {
    setEditVisible(false);
    setEditedName('');
    setSelectedCategory(null);
  };

  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (!name) return Alert.alert('Error', 'Category name cannot be empty.');
    if (data[name]) return Alert.alert('Error', 'Category already exists.');

    setData((prev) => ({ ...prev, [name]: [] }));
    hideDialog();
  };

  const handleEditCategory = () => {
    const newName = editedName.trim();
    if (!newName || newName === selectedCategory) return hideEditDialog();
    if (data[newName]) return Alert.alert('Error', 'Name already exists.');

    setData((prev) => {
      const updated = { ...prev };
      updated[newName] = updated[selectedCategory];
      delete updated[selectedCategory];
      return updated;
    });
    hideEditDialog();
  };

  const handleDelete = (category) => {
    Alert.alert('Delete', `Are you sure you want to delete "${category}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setData((prev) => {
            const updated = { ...prev };
            delete updated[category];
            return updated;
          });
        },
      },
    ]);
  };

  return (
    <Provider>
      <View style={styles.container}>
        {Object.keys(data).map((category) => (
          <Card
            key={category}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/messages',
                params: { category, messages: JSON.stringify(data[category]) },
              })
            }
          >
            <Card.Title title={`${category} Messages`} />
            <Card.Actions style={styles.actions}>
              <Button onPress={() => showEditDialog(category)}>Edit</Button>
              <Button onPress={() => handleDelete(category)} color="red">
                Delete
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Button mode="contained" onPress={showDialog} style={styles.addButton}>
          Add Category
        </Button>

        {/* Create Category Dialog */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>New Category</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Category Name"
                value={newCategory}
                onChangeText={setNewCategory}
                autoFocus
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleAddCategory}>Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Edit Category Dialog */}
        <Portal>
          <Dialog visible={editVisible} onDismiss={hideEditDialog}>
            <Dialog.Title>Edit Category</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="New Category Name"
                value={editedName}
                onChangeText={setEditedName}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideEditDialog}>Cancel</Button>
              <Button onPress={handleEditCategory}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#93C572', // Updated green shade
  },
  card: {
    marginBottom: 12,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  addButton: {
    marginTop: 16,
    borderRadius: 5,
  },
});

import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function MessagesScreen() {
  const { category, messages } = useLocalSearchParams();
  const [messageList, setMessageList] = useState(messages ? JSON.parse(messages) : []);
  const [newMessage, setNewMessage] = useState('');

  const handleAddMessage = () => {
    if (newMessage.trim() === '') return;
    setMessageList((prev) => [...prev, newMessage.trim()]);
    setNewMessage('');
  };

  const handleDeleteMessage = (index) => {
    Alert.alert('Delete', 'Are you sure you want to delete this message?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          setMessageList((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Messages</Text>

      <FlatList
        data={messageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.messageRow}>
              <Text style={styles.messageText}>{item}</Text>
              <TouchableOpacity onPress={() => handleDeleteMessage(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter a new message"
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button mode="contained" onPress={handleAddMessage} style={styles.addButton}>
        Add Message
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#C1E1C1',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  addButton: {
    marginTop: 10,
    borderRadius: 5,
  },
});

import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Onboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/onboard.png')}
        style={styles.image}
      />

      <Text style={styles.heading}>Welcome to Message Directory App</Text>
      <Text style={styles.subheading}>
        Organize your thoughts, memories, and ideas by category!
      </Text>

      <Button
        mode="contained"
        onPress={() => router.replace('/Home')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFE1AF',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1E1E1E',
  },
  subheading: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    color: '#444',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

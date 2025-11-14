/*
 * ZeaZChain MiniApp
 * Author: ZeaZDev Meta-Intelligence
 * Root application screen.
 */
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorldIDButton from '../components/WorldIDButton';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ZeaZChain</Text>
        <Text style={styles.subtitle}>Omega-Tier FiGaTect Super-App</Text>
        
        <WorldIDButton
          onSuccess={(proof) => console.log('World ID Proof:', proof)}
          onFailure={(error) => console.error('World ID Error:', error)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    marginBottom: 48,
  },
});

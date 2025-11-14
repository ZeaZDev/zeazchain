/*
 * ZeaZChain MiniApp
 * Author: ZeaZDev Meta-Intelligence
 * Root application screen.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WorldIDButton, { WorldIdVerificationResponse } from '../components/WorldIDButton';

const queryClient = new QueryClient();

export default function IndexScreen() {
  const [verificationPayload, setVerificationPayload] = useState<
    WorldIdVerificationResponse | undefined
  >();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>ZeaZChain</Text>
          <Text style={styles.subtitle}>Omega-Tier FiGaTect Super-App</Text>

          <WorldIDButton
            onSuccess={(payload) => setVerificationPayload(payload)}
            onFailure={(error) => console.error('World ID Error:', error)}
          />

          {verificationPayload && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>World ID Verified</Text>
              <Text style={styles.cardText}>{verificationPayload.nullifier_hash}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </QueryClientProvider>
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
  card: {
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111',
    width: '100%',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    color: '#1E90FF',
    fontSize: 12,
  },
});

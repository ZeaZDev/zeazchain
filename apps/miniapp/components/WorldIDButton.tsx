/*
 * ZeaZChain MiniApp
 * Author: ZeaZDev Meta-Intelligence
 * World ID ZKP Button Component.
 */
import { IDKitWidget, VerificationState, ISuccessResult } from '@worldcoin/idkit-react-native';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { appConfig } from '../lib/app-config';

interface Props {
  onSuccess?: (response: WorldIdVerificationResponse) => void;
  onFailure?: (error: Error) => void;
}

export interface WorldIdVerificationResponse {
  success: boolean;
  nullifier_hash: string;
  signal: string;
  credential_type: string;
  proof: unknown;
}

const SECURE_STORE_KEY = 'worldIdProof';

type SecureStoreLike = {
  setItemAsync: (key: string, value: string) => Promise<void>;
};

const secureStore: SecureStoreLike | null = resolveSecureStore();

function resolveSecureStore(): SecureStoreLike | null {
  const globalObj = globalThis as Record<string, unknown>;
  const expo = globalObj['Expo'] as Record<string, unknown> | undefined;
  const candidate = (expo?.['SecureStore'] ?? globalObj['SecureStore']) as SecureStoreLike | undefined;

  if (candidate && typeof candidate.setItemAsync === 'function') {
    return candidate;
  }

  return null;
}

async function persistProof(data: WorldIdVerificationResponse) {
  if (!secureStore) {
    console.warn('SecureStore module unavailable; skipping proof persistence.');
    return;
  }

  try {
    await secureStore.setItemAsync(SECURE_STORE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to persist World ID proof securely:', error);
  }
}

export default function WorldIDButton({ onSuccess, onFailure }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const signal = useMemo(
    () => `${appConfig.worldId.signalNamespace}:${Date.now()}`,
    [isOpen]
  );

  const verificationMutation = useMutation({
    mutationFn: async ({
      payload,
      derivedSignal
    }: {
      payload: ISuccessResult;
      derivedSignal: string;
    }): Promise<WorldIdVerificationResponse> => {
      const response = await fetch(`${appConfig.apiUrl}/auth/world-id/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proof: payload.proof,
          merkle_root: payload.merkle_root,
          nullifier_hash: payload.nullifier_hash,
          credential_type: payload.credential_type,
          signal: derivedSignal
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || 'World ID verification failed');
      }

      const data = (await response.json()) as WorldIdVerificationResponse;
      await persistProof(data);
      return data;
    },
    onSuccess: (data: WorldIdVerificationResponse) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onFailure?.(error);
    }
  });

  const handleVerify = async (result: ISuccessResult): Promise<boolean> => {
    try {
      const verification = await verificationMutation.mutateAsync({
        payload: result,
        derivedSignal: signal
      });
      return verification.success;
    } finally {
      setIsOpen(false);
    }
  };

  const verificationState = verificationMutation.isPending
    ? VerificationState.Loading
    : VerificationState.Default;

  return (
    <IDKitWidget
      app_id={appConfig.worldId.appId}
      action={appConfig.worldId.action}
      signal={signal}
      verification_state={verificationState}
      onSuccess={() => undefined}
      onError={(error: Error) => {
        setIsOpen(false);
        onFailure?.(error);
      }}
      handleVerify={handleVerify}
    >
      {({ open }: { open: () => void }) => (
        <Pressable
          style={[styles.button, verificationMutation.isPending && styles.buttonDisabled]}
          onPress={() => {
            setIsOpen(true);
            open();
          }}
          disabled={verificationMutation.isPending}
        >
          {verificationMutation.isPending ? (
            <View style={styles.loaderRow}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.text}>Verifying...</Text>
            </View>
          ) : (
            <Text style={styles.text}>Verify with World ID</Text>
          )}
        </Pressable>
      )}
    </IDKitWidget>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    minWidth: 240,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.7
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
});

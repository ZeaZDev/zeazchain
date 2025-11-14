/*
 * ZeaZChain MiniApp
 * Author: ZeaZDev Meta-Intelligence
 * World ID ZKP Button Component.
 */
import { IDKitWidget, VerificationState, ISuccessResult } from '@worldcoin/idkit-react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';

interface Props {
  onSuccess: (result: ISuccessResult) => void;
  onFailure: (error: any) => void;
}

// TODO: Pull these from environment config
const WORLD_ID_APP_ID = 'app_YOUR_WORLD_ID_APP_ID';
const WORLD_ID_ACTION = 'zeazchain-login';

export default function WorldIDButton({ onSuccess, onFailure }: Props) {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <IDKitWidget
      app_id={WORLD_ID_APP_ID}
      action={WORLD_ID_ACTION}
      signal="USER_UNIQUE_SIGNAL" // TODO: Use a real user signal
      verification_state={VerificationState.Loading}
      onSuccess={onSuccess}
      onError={onFailure}
      handleVerify={() => setIsVerifying(true)}
    >
      {({ open }) => (
        <Pressable 
          style={styles.button} 
          onPress={open} 
          disabled={isVerifying}
        >
          <Text style={styles.text}>
            {isVerifying ? 'Verifying...' : 'Verify with World ID'}
          </Text>
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
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

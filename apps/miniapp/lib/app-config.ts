import Constants from 'expo-constants';

export type AppConfig = {
  apiUrl: string;
  worldId: {
    appId: string;
    action: string;
    signalNamespace: string;
  };
};

const defaultConfig: AppConfig = {
  apiUrl: 'https://api.zeazchain.local',
  worldId: {
    appId: 'app_default',
    action: 'zeazchain-login',
    signalNamespace: 'zeazchain'
  }
};

function loadConfig(): AppConfig {
  const expo = Constants?.expoConfig ?? Constants?.manifest2;
  const extra = (expo as { extra?: Partial<AppConfig> } | undefined)?.extra ?? {};

  return {
    apiUrl: extra.apiUrl ?? defaultConfig.apiUrl,
    worldId: {
      appId: extra.worldId?.appId ?? defaultConfig.worldId.appId,
      action: extra.worldId?.action ?? defaultConfig.worldId.action,
      signalNamespace: extra.worldId?.signalNamespace ?? defaultConfig.worldId.signalNamespace
    }
  };
}

export const appConfig = loadConfig();

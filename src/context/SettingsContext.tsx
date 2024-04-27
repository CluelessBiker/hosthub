import { createContext, useContext, ReactNode, FC, useState } from 'react';
import { Settings } from '../types/Settings';

const defaultSettings: Settings = {
  apiKey: '',
  timeFormat: '24',
};

export const SettingsContext = createContext(defaultSettings);
export const SetSettingsContext = createContext<(settings: Settings) => void>(() => {});

export const useSettings = () => useContext(SettingsContext);
export const useSetSettings = () => useContext(SetSettingsContext);

type Props = {
  children: ReactNode;
};

export const SettingsContextProvider: FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={settings}>
      <SetSettingsContext.Provider value={setSettings}>
        {children}
      </SetSettingsContext.Provider>
    </SettingsContext.Provider>
  );
};

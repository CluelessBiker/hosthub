import { createContext, useContext, ReactNode, FC, useState, useEffect } from 'react';
import { Settings } from '../types/Settings';

export const defaultSettings: Settings = {
  apiKey: '',
  timeFormat: '24',
  dateFormat: 'eu',
  dateSeparator: '-',
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

  /** CHECK LOCAL STORAGE FOR PREVIOUSLY SAVED SITE SETTINGS */
  const storage = localStorage.getItem('settings');
  const savedSettings = storage ? JSON.parse(storage) : null;

  useEffect(() => {
    if (!savedSettings) return;
    setSettings(savedSettings);
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <SetSettingsContext.Provider value={setSettings}>
        {children}
      </SetSettingsContext.Provider>
    </SettingsContext.Provider>
  );
};

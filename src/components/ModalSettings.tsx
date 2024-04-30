import { ChangeEvent, FC, MouseEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import btn from '../styles/Buttons.module.css';
import { defaultSettings, useSetSettings, useSettings } from '../context/SettingsContext';
import { Settings } from '../types/Settings';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ToggleButtons from './ToggleButtons';
import { dateSelections, timeSelections } from '../constants/constants';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ModalSettings: FC<Props> = ({ open, setOpen }) => {
  const setSettings = useSetSettings();
  const settings = useSettings();

  const [siteSettings, setSiteSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    setSiteSettings(settings);
  }, [settings]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent,
    setting: string,
  ) => {
    setSiteSettings(oldSettings => ({
      ...oldSettings,
      [setting]: event.target.value,
    }));
  };

  const handleFormat = (value: string, setting: string) => {
    setSiteSettings(oldSettings => ({
      ...oldSettings,
      [setting]: value,
    }));
  };

  const handleSave = () => {
    setSettings(siteSettings);
    localStorage.setItem('settings', JSON.stringify(siteSettings));
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={'settings modal'}
      aria-describedby={'settings modal'}
    >
      <div className={'modal'}>
        <h3 className={'contentTitle'}>settings</h3>
        <label htmlFor={'api'} className={'dataLabel'}>
          api key :
        </label>
        <TextField
          multiline
          id={'api'}
          value={siteSettings.apiKey}
          placeholder={'enter your API key'}
          onChange={(value: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(value, 'apiKey')
          }
        />

        <ToggleButtons
          id={'time format'}
          data={timeSelections}
          label={'select time format :'}
          value={siteSettings.timeFormat}
          onChange={(_event: MouseEvent<HTMLElement>, value: string) =>
            handleFormat(value, 'timeFormat')
          }
        />

        <ToggleButtons
          id={'date format'}
          data={dateSelections}
          label={'select date format :'}
          value={siteSettings.dateFormat}
          onChange={(_event: MouseEvent<HTMLElement>, value: string) =>
            handleFormat(value, 'dateFormat')
          }
        />

        <label htmlFor={'dateDisplay'} className={'dataLabel'}>
          date display :
        </label>
        <Select
          displayEmpty
          id={'dateDisplay'}
          value={siteSettings.dateSeparator}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={value => handleInputChange(value, 'dateSeparator')}
        >
          <MenuItem value={'/'}>
            <p>12/01/2024</p>
          </MenuItem>
          <MenuItem value={'.'}>
            <p>12.01.2024</p>
          </MenuItem>
          <MenuItem value={'-'}>
            <p>12-01-2024</p>
          </MenuItem>
        </Select>

        <button className={btn.btn} aria-label={'save settings'} onClick={handleSave}>
          save
        </button>
      </div>
    </Modal>
  );
};

export default ModalSettings;

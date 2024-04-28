import { ChangeEvent, FC, MouseEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import btn from '../styles/Buttons.module.css';
import { defaultSettings, useSetSettings, useSettings } from '../context/SettingsContext';
import { Settings } from '../types/Settings';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

        <label htmlFor={'time'} className={'dataLabel'}>
          select time format :
        </label>
        <ToggleButtonGroup
          exclusive
          fullWidth
          id={'time'}
          aria-label={'time format'}
          value={siteSettings.timeFormat}
          onChange={(_event: MouseEvent<HTMLElement>, value) =>
            handleFormat(value, 'timeFormat')
          }
        >
          <ToggleButton value={'24'} aria-label={'24 hour time format'}>
            <p>24H</p>
          </ToggleButton>
          <ToggleButton value={'12'} aria-label={'12 hour time format'}>
            <p>12H</p>
          </ToggleButton>
        </ToggleButtonGroup>

        <label htmlFor={'date'} className={'dataLabel'}>
          select date format :
        </label>
        <ToggleButtonGroup
          exclusive
          fullWidth
          id={'date'}
          aria-label={'date format'}
          value={siteSettings.dateFormat}
          onChange={(_event: MouseEvent<HTMLElement>, value) =>
            handleFormat(value, 'dateFormat')
          }
        >
          <ToggleButton value={'eu'} aria-label={'EU date format'}>
            <p>DD-MM-YYYY</p>
          </ToggleButton>
          <ToggleButton value={'us'} aria-label={'US date format'}>
            <p>MM-DD-YYYY</p>
          </ToggleButton>
        </ToggleButtonGroup>

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

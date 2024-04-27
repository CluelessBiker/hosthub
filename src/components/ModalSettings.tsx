import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import btn from '../styles/Buttons.module.css';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ModalSettings: FC<Props> = ({ open, setOpen }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [timeFormat, setTimeFormat] = useState<string | null>('24');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleTimeFormat = (
    _event: MouseEvent<HTMLElement>,
    newFormat: string | null,
  ) => {
    setTimeFormat(newFormat);
  };

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify({ key: apiKey, time: timeFormat }));
    setOpen(false);
    window.location.reload();
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="settings modal"
      aria-describedby="settings modal"
    >
      <div className={'modal'}>
        <h3 className={'contentTitle'}>settings</h3>
        <TextField
          multiline
          label="API Key"
          id="outlined-textarea"
          value={apiKey}
          placeholder="enter your API key"
          onChange={handleInputChange}
        />

        <ToggleButtonGroup
          exclusive
          fullWidth
          value={timeFormat}
          onChange={handleTimeFormat}
          aria-label={'text alignment'}
        >
          <ToggleButton value={'12'} aria-label={'left aligned'}>
            <p>12H</p>
          </ToggleButton>
          <ToggleButton value={'24'} aria-label={'left aligned'}>
            <p>24H</p>
          </ToggleButton>
        </ToggleButtonGroup>

        <button className={btn.btn} aria-label={'save settings'} onClick={handleSave}>
          save
        </button>
      </div>
    </Modal>
  );
};

export default ModalSettings;

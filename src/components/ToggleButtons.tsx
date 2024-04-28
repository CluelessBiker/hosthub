import { FC, MouseEvent } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToggleOptions } from '../types/ToggleOptions';

type Props = {
  id: string;
  label: string;
  value: string;
  data: ToggleOptions[];
  onChange: (event: MouseEvent<HTMLElement>, value: string) => void;
};

const ToggleButtons: FC<Props> = ({ id, label, value, data, onChange }) => {
  return (
    <>
      <label htmlFor={id} className={'dataLabel'}>
        {label}
      </label>
      <ToggleButtonGroup
        id={id}
        exclusive
        fullWidth
        value={value}
        aria-label={id}
        onChange={onChange}
      >
        {data.map((it: ToggleOptions, index) => (
          <ToggleButton key={index + it.value} value={it.value} aria-label={it.ariaLabel}>
            <p>{it.text}</p>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleButtons;

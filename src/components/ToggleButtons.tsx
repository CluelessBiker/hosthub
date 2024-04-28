import { FC, MouseEvent } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Options {
  value: string;
  ariaLabel: string;
  text: string;
}

type Props = {
  id: string;
  label: string;
  value: string;
  data: Options[];
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
        {data.map((it: Options, index) => (
          <ToggleButton key={index + it.value} value={it.value} aria-label={it.ariaLabel}>
            <p>{it.text}</p>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleButtons;

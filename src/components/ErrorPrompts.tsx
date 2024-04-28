import { Rental } from '../types/Rental';
import { FC } from 'react';
import btn from '../styles/Buttons.module.css';

type Props = {
  error: string;
  apiKey: string;
  properties?: Rental[];
  handleSettings: () => void;
};

const ErrorPrompts: FC<Props> = ({ error, apiKey, properties, handleSettings }) => {
  const settingsButton = (
    <button className={btn.btn} aria-label={'go to settings'} onClick={handleSettings}>
      settings
    </button>
  );

  return (
    <>
      {/*PROMPT KEY ENTRY*/}
      {error === '' && apiKey === '' && (
        <>
          <p className={'warningText'}>Oops!</p>
          <p>Looks like you need to enter your API key to get started.</p>
          {settingsButton}
        </>
      )}

      {/*DISPLAY IF NO LISTINGS ARE AVAILABLE*/}
      {properties && apiKey !== '' && properties.length === 0 && error === '' && (
        <p>There are no listings to display</p>
      )}

      {/*NETWORK ERROR MESSAGE*/}
      {error !== '' && (
        <>
          <p className={'errorMessage'}>{error}</p> {settingsButton}
        </>
      )}
    </>
  );
};

export default ErrorPrompts;

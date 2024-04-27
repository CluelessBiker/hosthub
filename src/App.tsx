import { useEffect, useState, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Rental } from './types/Rental';
import RentalData from './components/RentalData';
import ModalSettings from './components/ModalSettings';
import IconGear from './assets/svgs/IconGear';
import btn from './styles/Buttons.module.css';

const App = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [properties, setProperties] = useState<[]>([]);
  const [error, setError] = useState<string>('');

  const storageSettings = useMemo(() => {
    return JSON.parse(localStorage.getItem('settings') || '');
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [apiKey, storageSettings]);

  useEffect(() => {
    if (apiKey !== '') setOpen(false);
    if (apiKey === '') setOpen(true);
  }, [apiKey]);

  useEffect(() => {
    if (storageSettings && typeof storageSettings.key === 'string') {
      setApiKey(storageSettings.key);
    }
  }, [storageSettings]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://eric.hosthub.com/api/2019-03-01/rentals', {
        method: 'GET',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const json = await response.json();
      setProperties(json.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch properties. Please check your API key and try again.');
    }
  };

  console.log(properties);

  const settingsButton = (
    <button aria-label={'go to settings'} onClick={() => setOpen(true)}>
      Settings
    </button>
  );

  return (
    <div className={'bodyContainer'}>
      <div className={'bodyInner'}>
        <Routes>
          <Route path={'/'} element={<></>} />
        </Routes>

        <button
          className={btn.iconBtn}
          aria-label={'go to settings'}
          onClick={() => setOpen(true)}
        >
          <IconGear color={'var(--mui-palette-primary-darkGrey)'} />
        </button>

        {/*PROMPT KEY ENTRY*/}
        {apiKey === '' && properties.length === 0 && (
          <>
            <p>
              Oops.
              <br /> Looks like you need to enter your API key to get started.
            </p>
            {settingsButton}
          </>
        )}

        {/*DISPLAY IF NO LISTINGS ARE AVAILABLE*/}
        {apiKey !== '' && properties.length === 0 && error === '' && (
          <p>There are no listings to display</p>
        )}

        {error !== '' && (
          <>
            <p>{error}</p> {settingsButton}
          </>
        )}

        {/*VIEW PROPERTY LISTINGS*/}
        {apiKey !== '' &&
          error === '' &&
          properties.length > 0 &&
          properties.map((data: Rental) => <RentalData key={data.id} data={data} />)}
      </div>

      <ModalSettings open={open} setOpen={setOpen} />
    </div>
  );
};

export default App;

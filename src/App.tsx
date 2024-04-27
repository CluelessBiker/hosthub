import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Rental } from './types/Rental';
import RentalData from './components/RentalData';
import ModalSettings from './components/ModalSettings';
import IconGear from './assets/svgs/IconGear';
import btn from './styles/Buttons.module.css';

const App = () => {
  const [apiKey, setApiKey] = useState<string>(
    'NzQxOGIyZTMtYmYyMS00MzE3LWE2NTEtNWQzY2EzMzVkYTEy',
  );
  const [open, setOpen] = useState<boolean>(false);
  const [properties, setProperties] = useState<[]>([]);

  useEffect(() => {
    fetchProperties();
  }, [apiKey]);

  useEffect(() => {
    if (apiKey === '') setOpen(true);
  }, [apiKey]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://eric.hosthub.com/api/2019-03-01/rentals', {
        method: 'GET',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setProperties(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(properties);

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
            <button aria-label={'go to settings'} onClick={() => setOpen(true)}>
              Settings
            </button>
          </>
        )}

        {/*DISPLAY IF NO LISTINGS ARE AVAILABLE*/}
        {apiKey !== '' && properties.length === 0 && (
          <p>There are no listings to display</p>
        )}

        {/*VIEW PROPERTY LISTINGS*/}
        {apiKey !== '' &&
          properties.length > 0 &&
          properties.map((data: Rental) => <RentalData key={data.id} data={data} />)}
      </div>

      <ModalSettings open={open} setOpen={setOpen} />
    </div>
  );
};

export default App;

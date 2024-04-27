import { FC, useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import btn from '../styles/Buttons.module.css';
import RentalData from '../components/RentalData';
import { Rental } from '../types/Rental';

type Props = {
  handleSettings: () => void;
};

const HomePage: FC<Props> = ({ handleSettings }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [properties, setProperties] = useState<Rental[]>([]);
  const [error, setError] = useState<string>('');

  const settings = useSettings();

  useEffect(() => {
    setApiKey(settings.apiKey);
  }, [settings]);

  useEffect(() => {
    fetchProperties();
  }, [apiKey, settings]);

  const fetchProperties = async () => {
    if (apiKey === '') return;
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
          <p>
            Oops!
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
    </>
  );
};

export default HomePage;

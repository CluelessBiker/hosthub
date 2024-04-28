import { FC, useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import RentalData from '../components/RentalData';
import { Rental } from '../types/Rental';
import ErrorPrompts from '../components/ErrorPrompts';

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

  return (
    <>
      <ErrorPrompts
        error={error}
        apiKey={apiKey}
        properties={properties}
        handleSettings={handleSettings}
      />

      {/*VIEW PROPERTY LISTINGS*/}
      <div className={'boxContentContainer'}>
        {apiKey !== '' &&
          error === '' &&
          properties.length > 0 &&
          properties.map((data: Rental) => <RentalData key={data.id} data={data} />)}
      </div>
    </>
  );
};

export default HomePage;

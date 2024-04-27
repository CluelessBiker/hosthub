import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Rental } from '../types/Rental';
import { useSettings } from '../context/SettingsContext';
import RentalData from '../components/RentalData';

const RentalPage = () => {
  const { id } = useParams();

  const settings = useSettings();

  const [apiKey, setApiKey] = useState<string>('');
  const [rental, setRental] = useState<Rental>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setApiKey(settings.apiKey);
  }, [settings]);

  useEffect(() => {
    if (apiKey === '') return;
    fetchRental();
  }, [id, apiKey]);

  const fetchRental = async () => {
    try {
      const response = await fetch(
        `https://eric.hosthub.com/api/2019-03-01/rentals/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const json = await response.json();
      setRental(json);
      setError('');
    } catch (error) {
      setError('Failed to fetch properties. Please check your API key and try again.');
    }
  };

  return (
    <>
      {error !== '' && <p>error</p>}
      {error === '' && rental && <RentalData fullDetails data={rental} />}
    </>
  );
};

export default RentalPage;

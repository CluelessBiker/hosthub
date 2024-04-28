import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Rental } from '../types/Rental';
import { useSettings } from '../context/SettingsContext';
import RentalData from '../components/RentalData';
import ErrorPrompts from '../components/ErrorPrompts';
import btn from '../styles/Buttons.module.css';
import { useNavigate } from 'react-router-dom';
import CalendarEvents from '../components/CalendarEvents';

type Props = {
  handleSettings: () => void;
};

const RentalPage: FC<Props> = ({ handleSettings }) => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleGoHome = () => {
    navigate('/');
  };

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
      <ErrorPrompts error={error} apiKey={apiKey} handleSettings={handleSettings} />
      {error === '' && rental && <RentalData fullDetails data={rental} />}
      <button
        className={btn.btn}
        onClick={handleGoHome}
        aria-label={'return to home page'}
      >
        back
      </button>
      <CalendarEvents id={id || ''} apiKey={settings.apiKey} />
    </>
  );
};

export default RentalPage;

import { useState, useEffect, FC } from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import { useSettings } from '../context/SettingsContext';
import formatDate from '../utils/formatDate';

type Props = {
  id: string;
  apiKey: string;
};

const CalendarEvents: FC<Props> = ({ id, apiKey }) => {
  const settings = useSettings();

  const [error, setError] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (apiKey === '') return;
    fetchEvents();
  }, [id, apiKey]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `https://eric.hosthub.com/api/2019-03-01/rentals/${id}/calendar-events`,
        {
          method: 'GET',
          headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        setError('Failed to fetch events.');
      }
      const json = await response.json();
      setEvents(json.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch events.');
    }
  };

  return (
    <>
      {events.length > 0 && <p className={'subHeading'}>Calendar Events:</p>}
      {error !== '' && <p>{error}</p>}

      <div className={'boxContentContainer'}>
        {error === '' &&
          events.length > 0 &&
          events.map(data => (
            <div key={data.id} className={'boxContent'}>
              <p>
                <span className={'dataLabel'}>Nights:</span> {data.nights}
              </p>
              <p>
                <span className={'dataLabel'}>Start date:</span>{' '}
                {formatDate(data.date_from, settings.dateFormat, settings.dateSeparator)}
              </p>
              <p>
                <span className={'dataLabel'}>End date:</span>{' '}
                {formatDate(data.date_to, settings.dateFormat, settings.dateSeparator)}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default CalendarEvents;

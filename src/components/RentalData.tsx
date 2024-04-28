import { FC } from 'react';
import { Rental } from '../types/Rental';
import { useNavigate } from 'react-router-dom';
import btn from '../styles/Buttons.module.css';
import { useSettings } from '../context/SettingsContext';
import formatTime from '../utils/formatTime';
import formatDate from '../utils/formatDate';

type Props = {
  data: Rental;
  fullDetails?: boolean;
};

const RentalData: FC<Props> = ({ data, fullDetails = false }) => {
  const navigate = useNavigate();
  const settings = useSettings();

  const handleViewListing = () => {
    navigate(`/rental/${data.id}`);
  };

  return (
    <>
      <div className={'boxContent'}>
        <p>{data.city}</p>
        {data.image_path && (
          <img
            src={data.image_path}
            className={'squareImg'}
            alt={`${data.city} property image`}
            aria-label={`${data.city} property image`}
          />
        )}

        {!fullDetails && (
          <button
            className={btn.btn}
            onClick={handleViewListing}
            aria-label={`view property details`}
          >
            view more
          </button>
        )}

        {fullDetails && (
          <>
            <p>
              <span className={'dataLabel'}>Check-in:</span>{' '}
              {formatTime(data.check_in_time, settings.timeFormat)}
            </p>
            <p>
              <span className={'dataLabel'}>Check-out:</span>{' '}
              {formatTime(data.checkout_time, settings.timeFormat)}
            </p>
            <p>
              <span className={'dataLabel'}>Location:</span>{' '}
              {data.city && `${data.city}, `}
              {data.postal_code && `${data.postal_code}, `}
              {data.country && data.country}
            </p>
            <p>
              <span className={'dataLabel'}>Property manager:</span> {data.name}
            </p>
            <p>
              <span className={'dataLabel'}>Last updated:</span>{' '}
              {formatDate(
                '2024-04-28T09:51:12.023Z',
                settings.dateFormat,
                settings.dateSeparator,
              )}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default RentalData;

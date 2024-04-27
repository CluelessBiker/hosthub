import { FC } from 'react';
import { Rental } from '../types/Rental';
import { useNavigate } from 'react-router-dom';
import btn from '../styles/Buttons.module.css';
import { useSettings } from '../context/SettingsContext';
import formatTime from '../utils/formatTime';

type Props = {
  data: Rental;
  fullDetails?: boolean;
};

const RentalData: FC<Props> = ({ data, fullDetails = false }) => {
  const navigate = useNavigate();
  const settings = useSettings();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
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
        <a href={`/rental/${data.id}`} aria-label={`view property details`}>
          view more
        </a>
      )}

      {fullDetails && (
        <>
          <p>{formatTime(data.check_in_time, settings.timeFormat)}</p>
          <p>{formatTime(data.checkout_time, settings.timeFormat)}</p>
          <p>
            {data.city}, {data.postal_code}, {data.country}
          </p>
          <p>Property manager: {data.checkout_time}</p>
          <a
            className={btn.btn}
            onClick={handleGoHome}
            aria-label={'return to home page'}
          >
            back
          </a>
        </>
      )}
    </div>
  );
};

export default RentalData;

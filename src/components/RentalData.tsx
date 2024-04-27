import { FC } from 'react';
import { Rental } from '../types/Rental';

type Props = {
  data: Rental;
};

const RentalData: FC<Props> = ({ data }) => {
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

      <a href={`/property/${data.id}`} aria-label={`view property details`}>
        view more
      </a>
    </div>
  );
};

export default RentalData;

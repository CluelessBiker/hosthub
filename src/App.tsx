import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [properties, setProperties] = useState<[]>([]);

  useEffect(() => {
    if (apiKey === '') setOpen(true);
  }, [apiKey]);

  return (
    <div className={'bodyContainer'}>
      <div className={'bodyInner'}>
        <Routes>
          <Route path={'/'} element={<></>} />
        </Routes>
        {apiKey === '' && properties.length === 0 && (
          <p>
            Oops.
            <br /> Looks like you need to enter your key.
          </p>
        )}
        {apiKey !== '' && properties.length === 0 && (
          <p>There are no listings to display</p>
        )}
      </div>
    </div>
  );
};

export default App;

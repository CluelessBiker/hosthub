import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RentalPage from './pages/RentalPage';
import ModalSettings from './components/ModalSettings';
import IconGear from './assets/svgs/IconGear';
import btn from './styles/Buttons.module.css';
import HomePage from './pages/HomePage';
import { useSettings } from './context/SettingsContext';

const App = () => {
  const [open, setOpen] = useState<boolean>(false);

  const settings = useSettings();

  useEffect(() => {
    if (settings.apiKey === '') setOpen(true);
  }, [settings]);

  return (
    <div className={'bodyContainer'}>
      <button
        className={btn.iconBtn}
        aria-label={'go to settings'}
        onClick={() => setOpen(true)}
      >
        <IconGear color={'var(--mui-palette-primary-green)'} />
      </button>

      <div className={'bodyInner'}>
        <Routes>
          <Route path={'/'} element={<HomePage handleSettings={() => setOpen(true)} />} />
          <Route path={'/rental/:id'} element={<RentalPage />} />
        </Routes>

        <ModalSettings open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default App;


import './App.css'
import { Route, Routes } from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Artists/>} />
    </Routes>
  </>
);

export default App

import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import Auth from './routes/auth/auth';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

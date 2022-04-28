import { Route, Routes } from 'react-router-dom';

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import SignIn from './routes/sign-in/sign-in';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

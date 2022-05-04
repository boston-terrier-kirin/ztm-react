import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChangedListener } from './utils/firebase/firebase.utils';

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import Auth from './routes/auth/auth';
import Shop from './routes/shop/shop';
import Checkout from './routes/checkout/checkout';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((authState) => {
      dispatch(setCurrentUser(authState));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

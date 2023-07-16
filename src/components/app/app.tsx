import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Offer from '../../pages/offer/offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer';

import Main from '../../pages/main/main';

type AppProps = {
  offersCount: number;
  offers: Offers;
}

function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Main
              offersCount={offersCount}
              offers={offers}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route path={AppRoute.Offer}>
          <Route
            path=':id'
            element={<Offer offers={offers} />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Offer from '../../pages/offer/offer';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

function App(): JSX.Element {
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          index
          element={
            <Main />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={isAuthorizationStatus}>
              <Favorites />
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
            element={
              <Offer />
            }
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

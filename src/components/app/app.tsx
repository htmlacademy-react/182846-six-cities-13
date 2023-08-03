import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Offer from '../../pages/offer/offer';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import PrivateRoute from '../private-route/private-route';
import { Reviews } from '../../types/review';
import Main from '../../pages/main/main';
import LoadingScreen from '../../pages/loading-screen.tsx/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

type AppProps = {
  reviews: Reviews;
}

function App({reviews}: AppProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const isQuestionsDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isQuestionsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

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
            element={
              <Offer
                offers={offers}
                reviews={reviews}
              />
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

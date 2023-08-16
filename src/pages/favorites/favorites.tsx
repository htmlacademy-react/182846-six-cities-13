import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selectors';
import { getFetchingStatusFavorites } from '../../store/favorites-data/selectors';
import classNames from 'classnames';
import { RequestStatus } from '../../const';
import Loader from '../../components/loader/loader';
import FavoritesOffers from '../../components/favorites-offers/favorites-offers';
import FavoritesOffersEmpty from '../../components/favorites-offers-empty/favorites-offers-empty';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import { Offers } from '../../types/offer';

const getFavoritesByCity = (favorites: Offers) => favorites.reduce<{[key: string]: Offers}>((acc, current) => {
  const city = current.city.name;

  if (!(city in acc)) {
    acc[city] = [];
  }
  acc[city].push(current);

  return acc;
}, {});


function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFetchingStatusFavorites);
  const favoriteByCity = getFavoritesByCity(favorites);
  const isEmpty = favorites.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Header />

      <main
        className={classNames({
          'page__main page__main--favorites': true,
          'page__main--favorites-empty': isEmpty
        })}
      >
        {isEmpty ? <FavoritesOffersEmpty /> : <FavoritesOffers offers={Object.entries(favoriteByCity)} />}
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;

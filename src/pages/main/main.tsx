import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';
import { CityListMemo as CityList } from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import { getOffers, getActiveCity } from '../../store/offers-data/selectors';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';

function Main(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const isEmpty = offers.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={classNames({
          'page__main page__main--index': true,
          'page__main--index-empty': isEmpty
        })}
      >
        <CityList currentCity={activeCity.name} />

        {isEmpty ? <CitiesEmpty /> : <Cities offers={offers} activeCity={activeCity} />}
      </main>
    </div>
  );
}

export default Main;

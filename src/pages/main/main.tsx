import { useState } from 'react';
import OfferList from '../../components/offer-list/offer-list';
import { Offer } from '../../types/offer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import PlaceSort from '../../components/place-sort/place-sort';
import { useAppSelector } from '../../hooks';
import { sorting } from '../../utils/sort';

function Main(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [currentSort, setCurrenSort] = useState('popular');

  const sortOffers = offers
    .slice()
    .filter((item) => item.city.name === activeCity.name);

  const handleListItemHover = (id: string) => {
    const currentPoint = sortOffers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList
              currentCity={activeCity.name}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortOffers.length} places to stay in {activeCity.name}</b>
              <PlaceSort onChange={(newSort) => setCurrenSort(newSort)} />

              <OfferList
                type='cities'
                offers={sorting[currentSort](sortOffers)}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  city={activeCity}
                  points={sortOffers}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;

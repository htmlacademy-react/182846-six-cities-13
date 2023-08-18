import { useState, useCallback, useMemo } from 'react';
import { PlaceSortMemo as PlaceSort } from '../place-sort/place-sort';
import { OfferListMemo as OfferList } from '../offer-list/offer-list';
import Map from '../map/map';
import { Offers, Offer, City } from '../../types/offer';
import { sorting } from '../../utils/sort';

type CitiesProps = {
  offers: Offers;
  activeCity: City;
}

function Cities({offers, activeCity}: CitiesProps) {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const [currentSort, setCurrenSort] = useState('popular');

  const sortOffersByCity = useMemo(
    () => offers.slice().filter((item) => item.city.name === activeCity.name),
    [activeCity.name, offers]);

  const sortOffersByCategory = useMemo(
    () => sorting[currentSort](sortOffersByCity),
    [currentSort, sortOffersByCity]);

  const handleListItemHover = useCallback((id: string | null) => {
    const currentPoint = sortOffersByCity.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  }, [sortOffersByCity]);

  const handleChangeSort = useCallback((newSort: string) => {
    setCurrenSort(newSort);
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortOffersByCity.length} places to stay in {activeCity.name}</b>
          <PlaceSort onChange={handleChangeSort} />

          <OfferList
            type='cities'
            offers={sortOffersByCategory}
            onListItemHover={handleListItemHover}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map">
            <Map
              city={activeCity}
              points={sortOffersByCity}
              selectedPoint={selectedPoint}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;

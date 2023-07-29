import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { changeCity, sortedOffersCity } from '../../store/action';

type CityListProps = {
  citys: string[];
  currentCity: string;
}

function CityList({citys, currentCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {citys.map((city, i) => {
        const keyValue = `${city}-${i}`;
        return (
          <li className="locations__item" key={keyValue}>
            <Link
              className={classNames({
                'locations__item-link': true,
                'tabs__item': true,
                'tabs__item--active': currentCity === city
              })}
              to="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeCity(city));
                dispatch(sortedOffersCity(city));
              }}
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CityList;

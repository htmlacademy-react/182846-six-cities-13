import { useState, memo } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Bookmark from '../bookmark/bookmark';
import classNames from 'classnames';
import { capitalizedString } from '../../utils/utils';
import './offer-card.css';

type OfferCardProps = Offer & {
  onCardHover?: (id: string | null) => void;
  favorite?: boolean;
};

function OfferCard(props: OfferCardProps): JSX.Element {
  const {id, title, type, price, previewImage, isPremium, rating, isFavorite, onCardHover, favorite = false} = props;

  const [activeFavorite, setActiveFavorite] = useState(isFavorite);

  const handleCardMouseEnter = () => {
    onCardHover?.(id);
  };

  const handleCardMouseLeave = () => {
    onCardHover?.(null);
  };

  return (
    <article
      className={classNames({
        'place-card': true,
        'cities__card': !favorite,
        'favorites__card': favorite
      })}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div
        className={classNames({
          'place-card__image-wrapper': true,
          'cities__image-wrapper': !favorite,
          'favorites__image-wrapper': favorite
        })}
      >
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <Bookmark
            id={id}
            isFavorite={activeFavorite}
            type='place-card'
            onClick={() => setActiveFavorite((prev) => !prev)}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedString(type)}</p>
      </div>
    </article>
  );
}

export const OfferCardMemo = memo(OfferCard);

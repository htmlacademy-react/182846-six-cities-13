import { memo } from 'react';
import { OfferCardMemo as OfferCard} from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import classNames from 'classnames';

type OfferListProps = {
  type: 'cities' | 'near';
  offers: Offers;
  onListItemHover?: (id: string | null) => void;
}

function OfferList({type, offers, onListItemHover}: OfferListProps): JSX.Element {
  const offerListClass = classNames({
    'places__list': true,
    'cities__places-list tabs__content': type === 'cities',
    'near-places__list': type === 'near'
  });

  return (
    <div className={offerListClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onCardHover={onListItemHover}
        />)
      )}
    </div>
  );
}

export const OfferListMemo = memo(OfferList);

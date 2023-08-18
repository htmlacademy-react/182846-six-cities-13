import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComment from '../../components/form-comment/form-comment';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import { OfferListMemo as OfferList } from '../../components/offer-list/offer-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchReviewsAction, fetchOfferNearbyAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import DetailedOffer from '../../components/detailed-offer/detailed-offer';
import GalleryOffer from '../../components/gallery-offer/gallery-offer';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { getOffer } from '../../store/offer-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { getNearbyOffers } from '../../store/nearby-data/selectors';
import { getFetchingStatusOffer } from '../../store/offer-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';

function Offer(): JSX.Element {
  const {id: offerId} = useParams();
  const isOfferDataLoading = useAppSelector(getFetchingStatusOffer);
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getNearbyOffers);
  const offers = useAppSelector(getOffers);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentOffer = offers.find(({id}) => id === offerId);
  const randomNearbyOffers = offersNearby.slice(0, 3);
  const randomNearbyMap = offersNearby.slice(0, 3);
  const dispatch = useAppDispatch();

  if (currentOffer) {
    randomNearbyMap.push(currentOffer);
  }

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isOfferDataLoading === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Header />
      {isOfferDataLoading === RequestStatus.Success && offer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <GalleryOffer offer={offer} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailedOffer offer={offer} />
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews} />

                {isAuthorizationStatus === AuthorizationStatus.Auth &&
                <FormComment offerId={offerId as string} />}
              </section>
            </div>
          </div>
          <section className="offer__map">
            <Map
              city={offer.city}
              points={randomNearbyMap}
              selectedPoint={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              type='near'
              offers={randomNearbyOffers}
            />
          </section>
        </div>
      </main>}
    </div>
  );
}

export default Offer;

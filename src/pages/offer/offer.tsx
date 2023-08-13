import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComment from '../../components/form-comment/form-comment';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import DetailedOffer from '../../components/detailed-offer/detailed-offer';
import GalleryOffer from '../../components/gallery-offer/gallery-offer';
import { AuthorizationStatus } from '../../const';

function Offer(): JSX.Element {
  const {id: offerId} = useParams();
  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const offer = useAppSelector((state) => state.currentOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isOfferDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Header />
      {!isOfferDataLoading && offer &&
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
              points={offersNearby}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              type='near'
              offers={offersNearby}
            />
          </section>
        </div>
      </main>}
    </div>
  );
}

export default Offer;

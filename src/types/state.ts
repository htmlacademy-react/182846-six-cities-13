import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const';
import { AuthorizedUser } from './user-data';
import { Offers, City, DetailOffer } from './offer';
import { Reviews } from './review';

export type UserData = {
  user: AuthorizedUser | null;
  authorizationStatus: AuthorizationStatus;
  sendingStatusLogin: RequestStatus;
}

export type OffersData = {
  offers: Offers;
  fetchingStatusOffers: RequestStatus;
  activeCity: City;
}

export type OfferData = {
  offer: DetailOffer | null;
  fetchingStatusOffer: RequestStatus;
}

export type ReviewsData = {
  reviews: Reviews;
  fetchingStatusReviews: RequestStatus;
  sendingStatusReview: RequestStatus;
}

export type NearbyData = {
  nearby: Offers;
  fetchingStatusNearby: RequestStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

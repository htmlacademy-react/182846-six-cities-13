import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity, filterOffer, loadOffers, setOffersDataLoadingStatus, requireAuthorization, loadOffer, loadReviews, loadOffersNearby } from './action';
import { Offers, City, DetailedOffer } from '../types/offer';
import { Reviews } from '../types/review';
import { CityMap, AuthorizationStatus } from '../const';

type InitialState = {
  city: City;
  offers: Offers;
  sortOffers: Offers;
  filterOffers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentOffer: DetailedOffer | null;
  reviews: Reviews;
  offersNearby: Offers;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  sortOffers: [],
  filterOffers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: null,
  reviews: [],
  offersNearby: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload.name);
    })
    .addCase(filterOffer, (state, action) => {
      switch (action.payload) {
        case 'high':
          state.filterOffers = state.sortOffers.sort((a, b) => a.price - b.price);
          break;
        case 'low':
          state.filterOffers = state.sortOffers.sort((a, b) => b.price - a.price);
          break;
        case 'top':
          state.filterOffers = state.sortOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffers = state.sortOffers.slice();
      }
    });
});

export {reducer};

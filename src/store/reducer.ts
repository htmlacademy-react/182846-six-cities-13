import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity, filterOffer } from './action';
import { offers } from '../mocks/offers';
import { Offers } from '../types/offer';

type InitialState = {
  city: string;
  offers: Offers;
  sortOffers: Offers;
  filterOffers: Offers;
}

const initialState: InitialState = {
  city: 'Paris',
  offers,
  sortOffers: [],
  filterOffers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(filterOffer, (state, action) => {
      switch (action.payload) {
        case 'high':
          state.sortOffers.sort((a, b) => a.price - b.price);
          break;
        case 'low':
          state.sortOffers.sort((a, b) => b.price - a.price);
          break;
        case 'top':
          state.sortOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffers = state.sortOffers;
      }
      state.city = action.payload;
    });
});

export {reducer};

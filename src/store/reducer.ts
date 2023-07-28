import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity } from './action';
import { offers } from '../mocks/offers';
import { Offers } from '../types/offer';

type InitialState = {
  city: string;
  offers: Offers;
  sortOffers: Offers;
}

const initialState: InitialState = {
  city: 'Paris',
  offers,
  sortOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    });
});

export {reducer};

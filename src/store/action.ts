import { createAction } from '@reduxjs/toolkit';
import { Offers, City } from '../types/offer';

export const changeCity = createAction<City>('changeCity');

export const sortedOffersCity = createAction<City>('sortedOffersCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

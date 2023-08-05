import { createAction } from '@reduxjs/toolkit';
import { Offers, City } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<City>('changeCity');

export const sortedOffersCity = createAction<City>('sortedOffersCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

import { createAction } from '@reduxjs/toolkit';
import { Offers, City, DetailedOffer } from '../types/offer';
import { Reviews } from '../types/review';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<City>('changeCity');

export const sortedOffersCity = createAction<City>('sortedOffersCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadOffer = createAction<DetailedOffer>('data/loadOffer');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const loadOffersNearby = createAction<Offers>('data/loadOffersNearby');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

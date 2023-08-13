import { createAction } from '@reduxjs/toolkit';
import { Offers, City, DetailOffer } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<City>('changeCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadOffer = createAction<DetailOffer>('data/loadOffer');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const loadOffersNearby = createAction<Offers>('data/loadOffersNearby');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const addReview = createAction<Review>('review/addReview');

export const dropSendingStatus = createAction('review/dropSendingStatus');

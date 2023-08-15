import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Offer, DetailOffer } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { AuthData } from '../types/auth-data';
import { AuthorizedUser } from '../types/user-data';
import { ReviewData } from '../types/review-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute, NameSpace } from '../const';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);

    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<DetailOffer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offer}/fetchOffer`,
  async (id, {extra: api}) => {
    const { data } = await api.get<DetailOffer>(`${APIRoute.Offers}/${id}`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const fetchOfferNearbyAction = createAsyncThunk<Offers, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.NearPlaces}/fetchNearPlace`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthorizedUser>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<AuthorizedUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<AuthorizedUser>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300) {
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Root));
    }

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/logout`,
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  }
);

export const postReview = createAsyncThunk<Review, {reviewData: ReviewData; offerId: Offer['id']}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/postReview`,
  async ({reviewData, offerId}, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewData);

    return data;
  }
);

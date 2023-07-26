import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Settings} from './const';
import { offers } from './mocks/offers';
import { city } from './mocks/city';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={Settings.offers}
      offers={offers}
      city={city}
      reviews={reviews}
    />
  </React.StrictMode>
);

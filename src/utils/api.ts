import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosBaseQuery.ts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Episodes', 'Character', 'Episodes', 'EpisodeCard', 'Locations', 'Location'],
  endpoints: () => ({}),
});

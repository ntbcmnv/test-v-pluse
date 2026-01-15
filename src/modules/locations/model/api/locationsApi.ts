import {apiSlice} from '@/utils/api.ts';
import type {ApiResponse} from '@/types.ts';
import type {Location} from '../types.ts';

export const locationsApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getLocations:
          builder.query<ApiResponse<Location>, void>
          ({
            query:
              () =>
                ({url: '/location', method: 'get'}),
            providesTags: ['Locations'],
          }),

        getLocation:
          builder.query<Location, number>
          ({
            query:
              (id) =>
                ({url: `/location/${id}`, method: 'get'}),
            providesTags: ['Location'],
          })
      }),
    overrideExisting: false,
  });

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
} = locationsApi;

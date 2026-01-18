import {apiSlice} from '@/shared/api/api.ts';
import type {ApiResponse} from '@/shared/types.ts';
import type {Location} from '../types.ts';

export const locationsApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getLocations: builder.query<
          ApiResponse<Location>,
          { page?: number; name?: string }
        >({
          query: ({page = 1, name}) => ({
            url: '/location',
            params: {
              page,
              name,
            },
          }),
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

import {apiSlice} from '@/shared/api/api.ts';
import type {ApiResponse} from '@/shared/types.ts';
import type {Episode} from '../types.ts';

export const episodesApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getEpisodes: builder.query<
          ApiResponse<Episode>,
          { page?: number; name?: string }
        >({
          query: ({page = 1, name}) => ({
            url: '/episode',
            params: {
              page,
              name,
            },
          }),
          providesTags: ['Episodes'],
        }),

        getEpisode:
          builder.query<Episode, number>
          ({
            query:
              (id) =>
                ({url: `/episode/${id}`, method: 'get'}),
            providesTags: ['Episode'],
          })
      }),
    overrideExisting: false,
  });

export const {
  useGetEpisodesQuery,
  useGetEpisodeQuery,
} = episodesApi;

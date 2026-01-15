import {apiSlice} from '@/utils/api.ts';
import type {ApiResponse} from '@/types.ts';
import type {Episode} from '../types.ts';

export const episodesApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getEpisodes:
          builder.query<ApiResponse<Episode>, void>
          ({
            query:
              () =>
                ({url: '/episode', method: 'get'}),
            providesTags: ['Episodes'],
          }),

        getEpisode:
          builder.query<Episode, number>
          ({
            query:
              (id) =>
                ({url: `/episode/${id}`, method: 'get'}),
            providesTags: ['EpisodeCard'],
          })
      }),
    overrideExisting: false,
  });

export const {
  useGetEpisodesQuery,
  useGetEpisodeQuery,
} = episodesApi;

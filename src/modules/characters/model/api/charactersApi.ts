import {apiSlice} from '@/shared/api/api.ts';
import type {ApiResponse} from '@/shared/types.ts';
import type {Character} from '../types.ts';

export const charactersApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getCharacters: builder.query<
          ApiResponse<Character>,
          { page?: number; name?: string }
        >({
          query: ({page = 1, name}) => ({
            url: '/character',
            params: {
              page,
              name,
            },
          }),
          providesTags: ['Characters'],
        }),

        getCharacter:
          builder.query<Character, number>
          ({
            query:
              (id) =>
                ({url: `/character/${id}`, method: 'get'}),
            providesTags: ['Character'],
          }),

        getCharactersByIds: builder.query<Character[], number[]>({
          query: (ids) => ({
            url: `/character/${ids.join(',')}`,
            method: 'get',
          }),
        }),
      }),
    overrideExisting: false,
  });

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useGetCharactersByIdsQuery,
} = charactersApi;

import {apiSlice} from '@/utils/api.ts';
import type {ApiResponse} from '@/types.ts';
import type {Character} from '../types.ts';

export const charactersApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) =>
      ({
        getCharacters:
          builder.query<ApiResponse<Character>, void>
          ({
            query:
              () =>
                ({url: '/character', method: 'get'}),
            providesTags: ['Episodes'],
          }),

        getCharacter:
          builder.query<Character, number>
          ({
            query:
              (id) =>
                ({url: `/character/${id}`, method: 'get'}),
            providesTags: ['Character'],
          })
      }),
    overrideExisting: false,
  });

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
} = charactersApi;

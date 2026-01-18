import {useGetCharactersQuery, useGetEpisodesQuery, useGetLocationsQuery} from '@/modules';
import type {SearchType} from '@/shared';

interface UseSearchPageArgs {
  page?: number;
  search?: string;
}

export const useSearchPage = (type: SearchType, {page = 1, search = ''}: UseSearchPageArgs) => {
  const queryArgs = {page, name: search || undefined};

  const charactersQuery = useGetCharactersQuery(queryArgs, {
    skip: type !== 'characters',
  });

  const episodesQuery = useGetEpisodesQuery(queryArgs, {
    skip: type !== 'episodes',
  });

  const locationsQuery = useGetLocationsQuery(queryArgs, {
    skip: type !== 'locations',
  });

  return {charactersQuery, episodesQuery, locationsQuery};
};

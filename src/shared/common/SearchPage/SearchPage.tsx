import {Spinner} from '@/components/ui/spinner';
import {toast} from 'sonner';
import {useEffect} from 'react';
import {renderMap, type SearchType, useSearchPage} from '@/shared';
import {useSearchParams} from 'react-router-dom';
import {Pagination} from '@/components/ui/pagination.tsx';
import type {Character, Episode, Location} from '@/modules';

interface Props {
  type: SearchType;
}

export const SearchPage = ({type}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? '';

  const {charactersQuery, episodesQuery, locationsQuery} = useSearchPage(type, {page, search});

  const activeQuery =
    type === 'characters' ? charactersQuery :
      type === 'episodes' ? episodesQuery : locationsQuery;

  const activeData = activeQuery.data;

  useEffect(() => {
    if (activeQuery.error) toast.error('An error occurred, try again later.');
  }, [activeQuery.error]);

  if (activeQuery.isLoading || activeQuery.isFetching) return (
    <div className="flex justify-center mt-10"><Spinner/></div>
  );

  if (!activeData?.results || activeData.results.length === 0) {
    return <div className="flex justify-center mt-10 text-muted-foreground">Nothing found</div>;
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (newPage > 1) params.set('page', newPage.toString());
    setSearchParams(params, {replace: true});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {type === 'characters' && (activeData.results as Character[]).map(renderMap.characters)}
        {type === 'episodes' && (activeData.results as Episode[]).map(renderMap.episodes)}
        {type === 'locations' && (activeData.results as Location[]).map(renderMap.locations)}
      </div>

      {activeData.info.pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={activeData.info.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

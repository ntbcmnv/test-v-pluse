import {useSearchParams} from 'react-router-dom';
import {useGetEpisodesQuery, EpisodeCard} from '@/modules';
import {Spinner} from '@/components/ui/spinner';
import {toast} from 'sonner';
import {useEffect} from 'react';

export const Episodes = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? '';

  const {data, isLoading, error} = useGetEpisodesQuery({
    page,
    name: search || undefined,
  });

  useEffect(() => {
    if (error) {
      toast.error('An error occurred, try again later.');
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data?.results.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
};

import {useGetEpisodesQuery} from '@/modules';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner.tsx';
import {EpisodeCard} from '@/modules/episodes/features';

export const Episodes = () => {
  const {data, isLoading, error} = useGetEpisodesQuery();

  useEffect(() => {
    if (error) {
      toast.error('Произошла ошибка при загрузке эпизодов');
    }
  }, [error]);

  if (isLoading) {
    return <div className="flex items-center justify-center">
      <Spinner/>
    </div>;
  }

  return (
    <div>
      {
        data ? data.results?.map(episode => (
            <EpisodeCard
              episode={episode}
              key={episode.id}
              className="p-3 mb-4"
            />
          )) :
          <div className="flex justify-center">Эпизоды не найдены</div>
      }
    </div>

  );
};

import {CharacterCard, useGetCharactersQuery} from '@/modules';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner.tsx';

export const Characters = () => {
  const {data, isLoading, error} = useGetCharactersQuery();

  useEffect(() => {
    if (error) {
      toast.error('Произошла ошибка при загрузке персонажей');
    }
  }, [error]);

  if (isLoading) {
    return <div className="flex items-center justify-center">
      <Spinner />
    </div>;
  }

  return (
    <div>
      {
        data ? data.results?.map(character => (
            <CharacterCard
              character={character}
              key={character.id}
              className="p-3 mb-4"
            />
          )) :
          <div className="flex justify-center">No content found</div>
      }
    </div>

  );
};

import {CharacterCard, useGetCharactersQuery} from '@/modules';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner.tsx';
import {useSearchParams} from 'react-router-dom';

export const Characters = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? '';

  const {data, error, isLoading} = useGetCharactersQuery({
    page,
    name: search || undefined,
  });

  useEffect(() => {
    if (error) {
      toast.error('An error occurred, try again later.');
    }
  }, [error]);

  if (isLoading) {
    return <div className="flex items-center justify-center mt-10">
      <Spinner/>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data?.results.map((character) => (
        <CharacterCard
          character={character}
          key={character.id}
        />
      ))}
    </div>
  );
};

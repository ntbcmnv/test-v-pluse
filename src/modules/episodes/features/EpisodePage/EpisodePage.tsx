import {NavLink, useParams} from 'react-router-dom';
import {useGetCharactersByIdsQuery, useGetEpisodeQuery} from '@/modules';
import {Spinner} from '@/components/ui/spinner.tsx';
import {toast} from 'sonner';
import {useEffect} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {BackButton} from '@/shared';

export const EpisodePage = () => {
  const {id} = useParams<{ id: string }>();
  const {data: episode, isLoading, error} = useGetEpisodeQuery(Number(id));

  const characterIds = episode?.characters
    .map((url) => Number(url.split('/').at(-1)))
    .filter(Boolean);

  const {
    data: characters,
    isLoading: isCharactersLoading,
  } = useGetCharactersByIdsQuery(characterIds!, {
    skip: characterIds?.length === 0,
  });

  const charactersList = Array.isArray(characters)
    ? characters
    : characters
      ? [characters]
      : [];

  useEffect(() => {
    if (error) {
      toast.error('An error occurred, try again later.');
    }
  }, [error]);

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <Spinner/>
    </div>
  );

  if (!episode) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Episode not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BackButton type="episodes"/>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="flex gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{episode.name}</h1>
            <p className="text-sm text-muted-foreground">Air Date</p>
            <p className="font-medium">{episode.air_date}</p>
            <p className="text-sm text-muted-foreground">Episode code</p>
            <p className="font-medium">{episode.episode}</p>
          </div>

        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Characters ({charactersList.length})
          </h2>

          {isCharactersLoading ? (
            <Spinner/>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {charactersList.map((character) => (
                <li key={character.id}>
                  <NavLink
                    to={`/characters/${character.id}`}
                    className="hover:text-green-400 transition-colors"
                  >
                    {character.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

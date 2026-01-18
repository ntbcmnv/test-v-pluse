import {NavLink, useParams} from 'react-router-dom';
import {getCharacterStatusColor, useGetCharacterQuery} from '@/modules';
import {Spinner} from '@/components/ui/spinner';
import {toast} from 'sonner';
import {useEffect} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils.ts';
import {BackButton, capitalizeFirstLetter} from '@/shared';

export const CharacterPage = () => {
  const {id} = useParams<{ id: string }>();
  const {data: character, isLoading, error} = useGetCharacterQuery(Number(id));

  const originId = character?.origin.url
    ? character?.origin.url.split('/').at(-1)
    : null;

  const locationId = character?.location.url
    ? character?.location.url.split('/').at(-1)
    : null;

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

  if (!character) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Character not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BackButton type="characters"/>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="flex gap-6 p-6">
          <img
            src={character.image}
            alt={character.name}
            className="max-w-full h-auto rounded-xl object-cover"
          />

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{character.name}</h1>

            <div className="flex gap-2 flex-wrap">
              <Badge
                className={`${getCharacterStatusColor(character.status)}`}
              >
                {capitalizeFirstLetter(character.status)}
              </Badge>
              <Badge className="bg-indigo-500">{capitalizeFirstLetter(character.species)}</Badge>
              <Badge
                className={
                  cn(character.gender === 'Female' ? `bg-pink-500`
                    : character.gender === 'Male' ? `bg-blue-400`
                      : character.gender === 'Genderless' ? `bg-cyan-500`
                        : `bg-zinc-500`
                  )}
              >
                {capitalizeFirstLetter(character.gender)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Origin</p>
            {originId ? (
              <NavLink
                to={`/locations/${originId}`}
                className="font-medium hover:text-green-400 transition-colors"
              >
                {capitalizeFirstLetter(character.origin.name)}
              </NavLink>
            ) : (
              <p className="font-medium">
                {capitalizeFirstLetter(character.origin.name)}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Last known location</p>
            {locationId ? (
              <NavLink
                to={`/locations/${locationId}`}
                className="font-medium hover:text-green-400 transition-colors"
              >
                {capitalizeFirstLetter(character.location.name)}
              </NavLink>
            ) : (
              <p className="font-medium">
                {capitalizeFirstLetter(character.location.name)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Species</p>
            <p className="font-medium">{capitalizeFirstLetter(character.species)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium">{capitalizeFirstLetter(character.gender)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Episodes ({character.episode.length})
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {character.episode.map((url) => {
              const episodeId = url.split('/').at(-1);

              return (
                <NavLink to={`/episodes/${episodeId}`} key={url}>
                  Episode #{episodeId}
                </NavLink>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

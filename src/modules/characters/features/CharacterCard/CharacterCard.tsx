import {type Character, CharacterStatus, useGetEpisodeQuery, useGetLocationQuery} from '@/modules';
import {Card, CardContent} from '@/components/ui/card.tsx';
import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {useCharacter} from '@/modules/characters/hooks/useCharacter/useCharacter.ts';

interface Props {
  character: Character
}

export const CharacterCard: React.FC<Props> = ({character}) => {
  const {firstLocationId, firstEpisodeId} = useCharacter(character)

  const {data: episode} = useGetEpisodeQuery(
    firstEpisodeId!,
    {skip: !firstEpisodeId}
  )

  const {data: location} = useGetLocationQuery(
    firstLocationId!,
    {skip: !firstLocationId}
  )

  return (
    <Card
      className="flex mb-3 justify-start gap-1 max-w-[500px] bg-black text-white border-green-500"
    >
      <img
        alt={character.name}
        src={character.image}
        className="max-w-[200px] h-auto object-cover rounded-l-xl flex-shrink-0"
      />

      <CardContent className="flex flex-col py-4 gap-2">
        <div className="flex flex-col">
          <NavLink
            to={`/characters/${character.id}`}
            className="text-xl font-bold mb-1 hover:text-green-500 transition-colors"
          >
            {character.name}
          </NavLink>
          <CharacterStatus character={character}/>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">Last known location:</p>
          <NavLink
            to={`/locations/${firstLocationId}`}
            className="font-bold text-lg mb-1 hover:text-green-500 transition-colors"
          >
            {location?.name}
          </NavLink>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">First seen in:</p>
          <NavLink
            to={`/episodes/${firstEpisodeId}`}
            className="font-bold text-lg mb-1 hover:text-green-500 transition-colors"
          >
            {episode?.name}
          </NavLink>
        </div>
      </CardContent>
    </Card>
  )
}

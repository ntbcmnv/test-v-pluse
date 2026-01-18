import * as React from 'react';
import {type Character, getCharacterStatusColor} from '@/modules';
import {capitalizeFirstLetter} from '@/shared';

interface Props {
  character: Character
}

export const CharacterStatus: React.FC<Props> = ({character}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${getCharacterStatusColor(character.status)}`}
      />
      <p className="font-bold text-lg">
        {capitalizeFirstLetter(character.status)} – {character.species}
      </p>
    </div>
  )
}

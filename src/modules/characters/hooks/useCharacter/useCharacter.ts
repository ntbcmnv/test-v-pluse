import * as React from 'react';
import type {Character} from '@/modules';

export const useCharacter = (character: Character) => {
  const firstEpisodeId = React.useMemo(() => {
    return character.episode[0]
      ? Number(character.episode[0].split('/').pop())
      : undefined;
  }, [character.episode])

  const firstLocationId = React.useMemo(() => {
    return character.episode[0]
      ? Number(character.episode[0].split('/').pop())
      : undefined;
  }, [character.episode])

  return {firstEpisodeId, firstLocationId}
}

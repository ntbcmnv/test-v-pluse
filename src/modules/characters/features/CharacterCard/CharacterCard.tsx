import {type Character} from '@/modules';
import {Card, CardContent, CardTitle} from '@/components/ui/card.tsx';
import * as React from 'react';

interface Props {
  character: Character
  className?: string
}

export const CharacterCard: React.FC<Props> = ({character, className}) => {
  return (
    <Card className={className}>
      <CardTitle>{character.name}</CardTitle>
      <CardContent>{character.status}</CardContent>
    </Card>
  )
}

import {type Episode} from '@/modules';
import {Card, CardContent, CardTitle} from '@/components/ui/card.tsx';
import * as React from 'react';

interface Props {
  episode: Episode
  className?: string
}

export const EpisodeCard: React.FC<Props> = ({episode, className}) => {
  return (
    <Card className={className}>
      <CardTitle>{episode.name}</CardTitle>
      <CardContent>{episode.air_date}</CardContent>
    </Card>
  )
}

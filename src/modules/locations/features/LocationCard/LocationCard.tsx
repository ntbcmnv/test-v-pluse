import {type Location} from '@/modules';
import {Card, CardContent, CardTitle} from '@/components/ui/card.tsx';
import * as React from 'react';

interface Props {
  location: Location;
  className?: string
}

export const LocationCard: React.FC<Props> = ({location, className}) => {
  return (
    <Card className={className}>
      <CardTitle>{location.name}</CardTitle>
      <CardContent>{location.type}</CardContent>
    </Card>
  )
}

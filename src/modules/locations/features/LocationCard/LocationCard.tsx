import {type Location} from '@/modules';
import {Card, CardContent} from '@/components/ui/card.tsx';
import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
  location: Location;
}

export const LocationCard: React.FC<Props> = ({location}) => {
  return (
    <Card
      className="flex mb-3 justify-start gap-1 max-w-[500px] bg-black text-white border-green-500"
    >
      <CardContent className="flex flex-col py-4 gap-2">
        <div className="flex flex-col">
          <NavLink
            to={`/location/${location.id}`}
            className="text-xl font-bold mb-1 hover:text-green-500 transition-colors"
          >
            {location.name}
          </NavLink>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">Type:</p>
          <p className="text-lg font-bold">{location.type}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">Dimension:</p>
          <p className="text-lg font-bold">{location.dimension}</p>
        </div>
      </CardContent>
    </Card>
  )
}

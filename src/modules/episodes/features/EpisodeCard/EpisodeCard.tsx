import {type Episode} from '@/modules';
import {Card, CardContent} from '@/components/ui/card.tsx';
import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
  episode: Episode
}

export const EpisodeCard: React.FC<Props> = ({episode}) => {
  return (
    <Card
      className="flex mb-3 justify-start gap-1 max-w-[500px] bg-black text-white border-green-500"
    >
      <CardContent className="flex flex-col py-4 gap-2">
        <div className="flex flex-col">
          <NavLink
            to={`/episode/${episode.id}`}
            className="text-xl font-bold mb-1 hover:text-green-500 transition-colors"
          >
            {episode.name}
          </NavLink>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">Air date:</p>
          <p className="text-lg font-bold">{episode.air_date}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-green-500 text-md">Code:</p>
          <p className="text-lg font-bold">{episode.episode}</p>
        </div>
      </CardContent>
    </Card>
  )
}

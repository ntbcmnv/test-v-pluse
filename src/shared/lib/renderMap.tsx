import {type Character, CharacterCard, type Episode, EpisodeCard, type Location, LocationCard} from '@/modules';

export const renderMap = {
  characters: (item: Character) => (
    <CharacterCard key={item.id} character={item}/>
  ),
  episodes: (item: Episode) => (
    <EpisodeCard key={item.id} episode={item}/>
  ),
  locations: (item: Location) => (
    <LocationCard key={item.id} location={item}/>
  ),
};


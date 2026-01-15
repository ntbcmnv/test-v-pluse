import type {Character} from '@/modules';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
}

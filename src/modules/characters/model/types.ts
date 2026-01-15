import type {Location} from '@/modules'

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: Location;
  image: string;
  episode: string[];
  url: string;
}

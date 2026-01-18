import type {Character} from '@/modules';

const statusColorMap: Record<Character['status'], string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

export const getCharacterStatusColor = (
  status: Character['status'],
): string => {
  return statusColorMap[status] ?? 'bg-gray-500';
};

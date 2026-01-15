import {LocationCard, useGetLocationsQuery} from '@/modules';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner.tsx';

export const Locations = () => {
  const {data, isLoading, error} = useGetLocationsQuery();

  useEffect(() => {
    if (error) {
      toast.error('Произошла ошибка при загрузке локаций');
    }
  }, [error]);

  if (isLoading) {
    return <div className="flex items-center justify-center">
      <Spinner/>
    </div>;
  }

  return (
    <div>
      {
        data ? data.results?.map(location => (
            <LocationCard
              location={location}
              key={location.id}
              className="p-3 mb-4"
            />
          )) :
          <div className="flex justify-center">Локации не найдены</div>
      }
    </div>

  );
};

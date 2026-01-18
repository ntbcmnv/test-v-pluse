import {LocationCard, useGetLocationsQuery} from '@/modules';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner.tsx';
import {useSearchParams} from 'react-router-dom';

export const Locations = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const search = searchParams.get('search') ?? '';

  const {data, error, isLoading} = useGetLocationsQuery({
    page,
    name: search || undefined,
  });

  useEffect(() => {
    if (error) {
      toast.error('An error occurred, try again later.');
    }
  }, [error]);

  if (isLoading) {
    return <div className="flex items-center justify-center mt-10">
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
            />
          )) :
          <div className="flex justify-center">Локации не найдены</div>
      }
    </div>

  );
};

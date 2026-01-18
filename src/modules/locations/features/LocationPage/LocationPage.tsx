import {NavLink, useParams} from 'react-router-dom';
import {useGetCharactersByIdsQuery, useGetLocationQuery} from '@/modules';
import {Spinner} from '@/components/ui/spinner.tsx';
import {toast} from 'sonner';
import {useEffect} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {BackButton} from '@/shared';

export const LocationPage = () => {
  const {id} = useParams<{ id: string }>();
  const {data: location, isLoading, error} = useGetLocationQuery(Number(id));

  const residentIds = location?.residents
    .map((url) => Number(url.split('/').at(-1)))
    .filter(Boolean);

  const {
    data: residents,
    isLoading: isResidentsLoading,
  } = useGetCharactersByIdsQuery(residentIds!, {
    skip: residentIds?.length === 0,
  });

  const residentsList = Array.isArray(residents)
    ? residents
    : residents
      ? [residents]
      : [];

  useEffect(() => {
    if (error) {
      toast.error('An error occurred, try again later.');
    }
  }, [error]);

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <Spinner/>
    </div>
  );

  if (!location) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Location not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BackButton type="locations"/>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="flex gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{location.name}</h1>
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-medium">{location.type}</p>
            <p className="text-sm text-muted-foreground">Dimension</p>
            <p className="font-medium">{location.dimension}</p>
          </div>

        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Residents ({residentsList.length})
          </h2>

          {isResidentsLoading ? (
            <Spinner/>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {residentsList.map((resident) => (
                <li key={resident.id}>
                  <NavLink
                    to={`/characters/${resident.id}`}
                    className="hover:text-green-400 transition-colors"
                  >
                    {resident.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

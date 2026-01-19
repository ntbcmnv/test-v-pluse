import {NavLink, useSearchParams} from 'react-router-dom';
import * as React from 'react';
import {useDebounce} from '@/shared';
import {Input} from '@/components/ui/input';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = React.useState(searchParams.get('search') ?? '');
  const debouncedValue = useDebounce(value, 400);

  React.useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (debouncedValue) {
        params.set('search', debouncedValue);
      } else {
        params.delete('search');
      }

      return params;
    }, {replace: true});
  }, [debouncedValue, setSearchParams]);

  const navLinkClass = ({isActive}: { isActive: boolean }) =>
    `transition-colors hover:text-green-500 font-bold ${
      isActive ? 'text-green-500' : ''
    }`;

  return (
    <header className="bg-black p-3 flex justify-between items-center gap-3 border-b-2 border-green-500">
      <NavLink to="/" className="hover:text-green-500 transition-colors">
        <img src="/logo.png" alt="Rick and Morty logo" className="w-15 h-auto"/>
      </NavLink>

      <div className="flex items-center gap-4">
        <nav className="flex gap-4">
          <NavLink to="/characters" className={navLinkClass}>Characters</NavLink>
          <NavLink to="/episodes" className={navLinkClass}>Episodes</NavLink>
          <NavLink to="/locations" className={navLinkClass}>Locations</NavLink>
        </nav>
      </div>

      <div className="relative max-w-md">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="text-white"
        />
      </div>
    </header>
  );
};

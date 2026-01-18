import {CharacterPage, EpisodePage, LocationPage} from '@/modules';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header, SearchPage} from '@/shared';

function App() {
  return (
    <>
      <Header/>
      <div className="max-w-5xl mx-auto my-10">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />

          <Route path="/characters" element={<SearchPage type="characters"/>}/>
          <Route path="/episodes" element={<SearchPage type="episodes"/>}/>
          <Route path="/locations" element={<SearchPage type="locations"/>}/>

          <Route path="/characters/:id" element={<CharacterPage/>}/>
          <Route path="/episodes/:id" element={<EpisodePage/>}/>
          <Route path="/locations/:id" element={<LocationPage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App

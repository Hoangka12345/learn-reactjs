import TodoFeature from './features/Todo';
import AlbumFeature from './features/Song';
import CounterFeature from './features/Counter';
import NotFound from './components/NotFound';
import { Routes, Route, Link } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
//Hoang ka ngu
      <Routes>
        <Route path="/" element={<CounterFeature />} />
        <Route path="/todos/*" element={<TodoFeature />} />
        <Route path="/albums" element={<AlbumFeature />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

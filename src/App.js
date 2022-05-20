import TodoFeature from './features/Todo';
import AlbumFeature from './features/Song';
import CounterFeature from './features/Counter';
import NotFound from './components/NotFound';
import ProductFeature from './features/product';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CounterFeature />} />
        <Route path="/todos/*" element={<TodoFeature />} />
        <Route path="/albums" element={<AlbumFeature />} />
        <Route path="/products" element={<ProductFeature />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

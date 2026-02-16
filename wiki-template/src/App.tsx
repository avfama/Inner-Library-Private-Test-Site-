import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PageView } from './pages/PageView';
import { PageEditor } from './pages/PageEditor';
import { SearchPage } from './pages/SearchPage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="page/:slug" element={<PageView />} />
          <Route path="new" element={<PageEditor />} />
          <Route path="edit/:slug" element={<PageEditor />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

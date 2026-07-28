import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ToolPage from './pages/ToolPage.jsx';

function App() {
  return (
    <HashRouter>
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:toolId" element={<ToolPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;

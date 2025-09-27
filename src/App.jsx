import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import History from './pages/History.jsx';
import Logout from './pages/Logout.jsx';

function App() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#fafbfc', minHeight: '100vh' }}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;

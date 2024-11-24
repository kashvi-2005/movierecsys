import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Recommend from './Recommend';
import About from './About';
import How from './How';
import RecommendationsPage from './RecommendationsPage'; // Import your new RecommendationsPage
import Apology from './Apology';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<How />} />
        <Route path="/recommendations" element={<RecommendationsPage />} /> {/* Add this route */}
        <Route path="/apology" element={<Apology />} />
      </Routes>
    </Router>
  );
}

export default App;

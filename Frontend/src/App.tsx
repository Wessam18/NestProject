import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import { WishlistProvider } from './context/wishlistContext';
import WishlistPage from './pages/WishlistPage';

const App = () => (
    <WishlistProvider>

        <Router>
            <Routes>
                <Route path="/" element={<SearchMovies />} />
                <Route path="/favorites" element={<WishlistPage />} />
            </Routes>
        </Router>
    </WishlistProvider>

);

export default App;

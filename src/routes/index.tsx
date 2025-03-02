import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Recipes from '../pages/Recipes';
import RecipeDetail from '../pages/RecipeDetail';
import Contact from '../pages/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:slug" element={<RecipeDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
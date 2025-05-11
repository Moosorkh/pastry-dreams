import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Recipes from '../pages/Recipes';
import RecipeDetail from '../pages/RecipeDetail';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/admin/Dashboard';
import RecipeForm from '../pages/admin/RecipeForm';
import GalleryItemForm from '../pages/admin/GalleryItemForm';
import ContactMessageView from '../pages/admin/ContactMessageView';
import NotFound from '../pages/NotFound';
import { useAuth } from '../contexts/AuthContext';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode, requireAdmin?: boolean }> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    // Redirect to login but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    // If admin access is required but user is not admin
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* Redirect About to Home with reference to about section */}
        <Route path="/about" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/recipes/new" element={
          <ProtectedRoute requireAdmin>
            <RecipeForm />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/recipes/edit/:id" element={
          <ProtectedRoute requireAdmin>
            <RecipeForm />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/gallery/new" element={
          <ProtectedRoute requireAdmin>
            <GalleryItemForm />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/gallery/edit/:id" element={
          <ProtectedRoute requireAdmin>
            <GalleryItemForm />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/contact/:id" element={
          <ProtectedRoute requireAdmin>
            <ContactMessageView />
          </ProtectedRoute>
        } />
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
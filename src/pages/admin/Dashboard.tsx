import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { recipeService, galleryService, contactService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState({ recipes: false, gallery: false, contact: false });
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: '', type: '' });

  // Fetch data when tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (tabValue) {
          case 0: // Recipes
            if (!recipes.length) {
              setLoading(prev => ({ ...prev, recipes: true }));
              const response = await recipeService.getRecipes();
              setRecipes(response.data.data);
              setLoading(prev => ({ ...prev, recipes: false }));
            }
            break;
          case 1: // Gallery
            if (!galleryItems.length) {
              setLoading(prev => ({ ...prev, gallery: true }));
              const response = await galleryService.getGalleryItems();
              setGalleryItems(response.data.data);
              setLoading(prev => ({ ...prev, gallery: false }));
            }
            break;
          case 2: // Contact Messages
            if (!contactMessages.length) {
              setLoading(prev => ({ ...prev, contact: true }));
              const response = await contactService.getContactMessages();
              setContactMessages(response.data.data);
              setLoading(prev => ({ ...prev, contact: false }));
            }
            break;
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load data');
        setLoading({ recipes: false, gallery: false, contact: false });
      }
    };

    fetchData();
  }, [tabValue]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle delete confirmation dialog
  const openDeleteDialog = (id: string, type: string) => {
    setDeleteDialog({ open: true, id, type });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, id: '', type: '' });
  };

  const handleDelete = async () => {
    try {
      const { id, type } = deleteDialog;
      
      switch (type) {
        case 'recipe':
          await recipeService.deleteRecipe(id);
          setRecipes(recipes.filter((recipe: any) => recipe.id !== id));
          break;
        case 'gallery':
          await galleryService.deleteGalleryItem(id);
          setGalleryItems(galleryItems.filter((item: any) => item.id !== id));
          break;
        case 'contact':
          await contactService.deleteContactMessage(id);
          setContactMessages(contactMessages.filter((message: any) => message.id !== id));
          break;
      }
      
      closeDeleteDialog();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  // Handle contact message status update
  const updateMessageStatus = async (id: string, status: string) => {
    try {
      await contactService.updateContactMessage(id, status);
      
      // Update local state
      setContactMessages(contactMessages.map((message: any) => 
        message.id === id ? { ...message, status } : message
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update message status');
    }
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1">
            You need administrator privileges to access this page.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Admin Dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Recipes" />
            <Tab label="Gallery" />
            <Tab label="Contact Messages" />
          </Tabs>
          
          {/* Recipes Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/admin/recipes/new"
                startIcon={<AddIcon />}
              >
                Add New Recipe
              </Button>
            </Box>
            
            {loading.recipes ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Difficulty</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recipes.map((recipe: any) => (
                      <TableRow key={recipe.id}>
                        <TableCell>{recipe.title}</TableCell>
                        <TableCell>{recipe.category}</TableCell>
                        <TableCell>
                          <Chip 
                            label={recipe.difficulty} 
                            color={
                              recipe.difficulty === 'Easy' ? 'success' : 
                              recipe.difficulty === 'Medium' ? 'warning' : 'error'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(recipe.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            component={RouterLink} 
                            to={`/recipes/${recipe.id}`}
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton 
                            component={RouterLink} 
                            to={`/admin/recipes/edit/${recipe.id}`}
                            color="info"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => openDeleteDialog(recipe.id, 'recipe')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          
          {/* Gallery Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/admin/gallery/new"
                startIcon={<AddIcon />}
              >
                Add New Gallery Item
              </Button>
            </Box>
            
            {loading.gallery ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Featured</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {galleryItems.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }} 
                          />
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {item.featured ? (
                            <Chip label="Featured" color="success" size="small" />
                          ) : (
                            <Chip label="Regular" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            component={RouterLink} 
                            to={`/admin/gallery/edit/${item.id}`}
                            color="info"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => openDeleteDialog(item.id, 'gallery')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          
          {/* Contact Messages Tab */}
          <TabPanel value={tabValue} index={2}>
            {loading.contact ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contactMessages.map((message: any) => (
                      <TableRow key={message.id}>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>
                          {new Date(message.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={message.status} 
                            color={
                              message.status === 'NEW' ? 'info' : 
                              message.status === 'READ' ? 'primary' :
                              message.status === 'REPLIED' ? 'success' : 'default'
                            }
                            size="small"
                            onClick={() => {
                              type MessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
                              const statusMap: Record<MessageStatus, MessageStatus> = {
                                NEW: 'READ',
                                READ: 'REPLIED',
                                REPLIED: 'ARCHIVED',
                                ARCHIVED: 'NEW'
                              };
                              const nextStatus = statusMap[message.status as MessageStatus];
                              updateMessageStatus(message.id, nextStatus);
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            component={RouterLink} 
                            to={`/admin/contact/${message.id}`}
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => openDeleteDialog(message.id, 'contact')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </Paper>
      </Box>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
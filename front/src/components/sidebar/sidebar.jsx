import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, Divider } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function Sidebar({ menuItems = [] }) {
  const [open, setOpen] = useState(true); // Gère l'état ouvert/fermé

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 70, // Largeur variable selon l'état
        flexShrink: 0,
        transition: 'width 0.3s ease', // Animation fluide lors de l'ouverture/fermeture
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 70,
          boxSizing: 'border-box',
          backgroundColor: '#2C3E50', // Couleur de fond de la sidebar
          color: '#ECF0F1', // Couleur des textes
        },
      }}
    >
      <Toolbar>
        <IconButton onClick={toggleDrawer} sx={{ color: '#ECF0F1' }}>
          {open ? <ChevronLeft /> : <ChevronRight />} {/* Icone pour basculer */}
        </IconButton>
      </Toolbar>
      
      <Divider sx={{ backgroundColor: '#7F8C8D' }} />
      
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} sx={{
            '&:hover': {
              backgroundColor: '#34495E', // Effet de survol
            },
          }}>
            <ListItemIcon sx={{ color: '#ECF0F1' }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.label} />} {/* Afficher le texte uniquement quand la sidebar est ouverte */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;

  // components/NavBar.tsx
  import React from 'react';
  import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
  
  interface NavBarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
  }
  
  const NavBar: React.FC<NavBarProps> = ({ currentPage, setCurrentPage }) => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PersonaBoost
          </Typography>
          <Box>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('dashboard')}
              sx={{ fontWeight: currentPage === 'dashboard' ? 'bold' : 'normal' }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('quiz')}
              sx={{ fontWeight: currentPage === 'quiz' ? 'bold' : 'normal' }}
            >
              Personality Quiz
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('growth')}
              sx={{ fontWeight: currentPage === 'growth' ? 'bold' : 'normal' }}
            >
              Growth Plan
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default NavBar;

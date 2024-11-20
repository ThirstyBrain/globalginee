import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import NavBar from './components/nav-bar';
import Dashboard from './components/dashboard';
import PersonalityQuiz from './components/personality-quiz';
import Layout from '../../props/layout/layout';
import GrowthPlan from './components/growth-plan';

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#ff4081',
      },
    },
  });
  
  const PersonaPath = () => {
    const [currentPage, setCurrentPage] = useState('quiz');//default current page
    const [personalityType, setPersonalityType] = useState<string | null>(null);
  
    return (
      <Layout>
      {/* Breadcrumbs */}
      <Box sx={{borderRadius: 2,borderColor:"#4caf50"}}>
        <Box py={0} px={4} sx={{backgroundColor: "#fff",
                                borderRadius: 2,
                                borderBottomLeftRadius:0,
                                borderBottomRightRadius:0,
                                borderColor:"#cddc39"}}>
            {/* <Box width="100%">
              <Box width="100%">
                <Typography variant="h5" component="h1" my={1} fontWeight={400} sx={{color:'#2BBBAD'}}>
                Persona Boost
                </Typography>
              </Box>
            </Box> */}
        </Box>
       {/* widgets */}
       {/* //orange */}
      <Box  px={3} sx={{backgroundColor: ""}}>
        <Box width="100%">
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {currentPage === 'dashboard' && (
            <Dashboard personalityType={personalityType} setCurrentPage={setCurrentPage}/>
          )}
          {currentPage === 'quiz' && (
            <PersonalityQuiz setPersonalityType={setPersonalityType} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'growth' && (
            <GrowthPlan setCurrentPage={setCurrentPage}/>
          )}
        </Box>
      </ThemeProvider>
  
        </Box>
      </Box>
      {/* grey */}
      <Box py={20} px={3} sx={{backgroundColor: ""}}>
        <Box width="100%">
  
        </Box>
      </Box>
      
    </Box>
  </Layout>

    );
  };
  
  export default PersonaPath;
  
  
  
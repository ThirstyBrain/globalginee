import React from 'react'
import Layout from '../../props/layout/layout';
import { Box,  Typography } from '@mui/material';
import TicTacToeGame from './tic-tac-game';


const TicTacToe: React.FC = () => {
  return (
    
    <Layout>
        
      {/* Breadcrumbs */}
      <Box sx={{borderRadius: 2,borderColor:"#4caf50"}}>
        <Box py={0} px={4} >
            <Box width="100%">
              <Box width="100%">
                <Typography variant="h5" component="h1" my={1} fontWeight={400} sx={{color:'#2BBBAD'}}>
                   Tic Tac Toe Game
                </Typography>
              </Box>
            </Box>
        </Box>
       {/* widgets */}
       {/* //orange */}
      <Box  px={0} sx={{backgroundColor: ""}}>
        <Box width="100%">
        <TicTacToeGame/>
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

export default TicTacToe
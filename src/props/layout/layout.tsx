// import { Box } from "@mui/material";
// import { ReactNode } from "react";
// import Sidebar1 from "../../components/sidebar/sidebar1";
// import Sidebar from "../../components/sidebar/sidebar";
// //import MenuAppBar from "../../components/menu-app-bar/menu-app-bar";

// interface LayoutProps{
//     children : ReactNode
// }

// const Layout: React.FC<LayoutProps> = ({children}:LayoutProps) => {
//     return (
//         <Box sx={{
//             backgroundColor: "", // all black color
//             display: "flex",
//             flexDirection: {
//               xs: "column",
//               lg: "row",
//             },
//             color: "white",
//             padding: 3,
//             gap: 3,
//             overflowY: "hidden",
//             height: "100vh"
//         }}>
//           <Sidebar/>
//           <Box sx={{ width: "100%", overflowY: "scroll" , borderColor:""}}>
//             {children}
//           </Box>
//         </Box>
//       )

// }

// export default Layout;

import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/sidebar/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive Drawer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Component */}
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          mt: 8, // Offset for the AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

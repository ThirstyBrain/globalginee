import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Hidden } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'
import homeIcon from  '../../assets/icons/icon-home.svg'
import invoiceIcon from '../../assets/icons/icon-invoice.svg';



const drawerWidth = 240;
const navLinks = [
    {
      name: "Ifsc",
      icon: homeIcon,
      link: "/ifsc",
    },
    {
      name: "Blogs",
      icon: invoiceIcon,
      link: "/blog",
    }
  ];
// export default function PermanentDrawerLeft() {
const Sidebar1: React.FC = () => {
  const {pathname} = useLocation();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
     
        <Divider />
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? homeIcon : appointmentIcon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Divider />
        {/* new sidebar */}
        <Box sx={{
        backgroundColor: "#018786",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          sm: "100%",
          lg: 200,
        },
     }}>
        
       {/* //menu   */}
       <Box sx={{
            display: "flex",
            flexDirection: {
                xs: "row",
                lg: "column",
            },
            gap: 5,
            alignItems: {
                xs: "center",
                lg: "start",
            },
            width: "100%",
       }}>
       <Hidden smDown>
          <Typography
            variant="h5"
            component="h1"
            my={2}
            fontWeight={400}
            fontSize={18}
          >
            Globalginee
          </Typography>
        </Hidden>

        <Box sx={{
            py: {
                xs: "0px",
                lg: "16px",
            },
            display: "flex",
            flexDirection: {
                xs: "row",
                lg: "column",
            },
            gap: 4,
        }}>
         {navLinks.map((item)=>(
            <Link 
                key={item.name}
                to={item.link}
                style={{ textDecoration: "none" }}
            >
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "white",
                textDecoration: "none",
            }}>
            <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: "25px",
                    filter: `${
                      pathname === item.link
                        ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                        : "invert(84%)"
                    }`,
                  }}
            />
            <Hidden mdDown>
                  <Typography>{item.name}</Typography>
            </Hidden>
            </Box>

             </Link>
         ))}


        </Box>
       </Box>
    </Box>
      </Drawer>
     
    </Box>
  );
}

export default Sidebar1;
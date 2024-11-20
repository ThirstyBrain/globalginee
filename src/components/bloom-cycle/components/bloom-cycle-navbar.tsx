import React from "react";
import { Button, AppBar, Toolbar, Container, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Create styled components
const NavContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
});

// const NavButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.common.white,
//   textTransform: 'none',
//   '&:hover': {
//     backgroundColor: theme.palette.primary.light,
//   },
// }));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '24px',
  color: theme.palette.common.white,
  marginRight: 'auto',
}));

const BloomCycleNavbar: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, boxShadow: "none" }}>
      <Container>
        <Toolbar>
          <Logo variant="h6"></Logo>
          <NavContainer>
          <Button component={Link} to="" sx={{ color: theme.palette.common.white, textTransform: 'none' }}>
              Home
            </Button>
            <Button component={Link} to="tracker" sx={{ color: theme.palette.common.white, textTransform: 'none' }}>
              Tracker
            </Button>
          </NavContainer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BloomCycleNavbar;

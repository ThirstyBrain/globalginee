// import React from "react";
// import { Container, Button, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/header";

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* <Header /> */}
//       <Container>
//         <Box textAlign="center" mt={5}>
//           <Typography variant="h4" gutterBottom>
//             Welcome to Women's Wellness Tracker
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Track your menstrual cycle, fertility, and more. Stay informed about your health!
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("tracker")}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default HomePage;

import React from "react";
import { Container, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
}));

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ maxWidth: 'sm', paddingTop:'20px' }}>
        <StyledPaper>
          <Box mb={4} >
            <Typography variant="h4" component="h1" color="primary" gutterBottom>
              Welcome to Your Wellness Journey
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
              Your health is your greatest wealth. Our Women's Wellness Tracker will empower you to stay on top of your menstrual cycle, fertility, and overall wellness.
            </Typography>
            <Typography variant="body1" color="textPrimary" paragraph>
              🌸 Whether you're planning, tracking, or simply staying informed, this is the first step to taking control of your health. Empower yourself, make informed decisions, and live a life full of energy and vitality.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              borderRadius: '50px',
              padding: '10px 30px',
              fontSize: '16px',
              fontWeight: 600,
            }}
            onClick={() => navigate("tracker")}
          >
            Get Started
          </Button>
        </StyledPaper>
      </Container>
    </>
  );
};

export default HomePage;

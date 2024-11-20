import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Outlet,
} from "react-router-dom";
import theme from "./theme";
import { Box } from "@mui/material";
import Layout from "../../props/layout/layout";
import BloomCycleNavbar from "./components/bloom-cycle-navbar";

const BloomCycle: React.FC = () => {
  return (
    <Layout>
      {/* Breadcrumbs */}
      <Box sx={{ borderRadius: 2, borderColor: "#4caf50" }}>
        <Box
          py={0}
          px={4}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderColor: "#cddc39",
          }}
        >
          <Box width="100%">
            <Box width="100%">
              {/* <Typography
                variant="h5"
                component="h1"
                my={1}
                fontWeight={400}
                sx={{ color: "#2BBBAD" }}
              >
                Bloom Cycle
              </Typography> */}
            </Box>
          </Box>
        </Box>
        {/* widgets */}
        {/* //orange */}
        <Box px={0} sx={{ backgroundColor: "" }}>
          <Box width="100%">
            <ThemeProvider theme={theme}>
              <div>
                {/* <nav>
                  <Link to="">Home</Link> | <Link to="tracker">Tracker</Link>
                </nav> */}
                <BloomCycleNavbar/>
                <Outlet />
              </div>
            </ThemeProvider>
          </Box>
        </Box>
        {/* grey */}
        <Box py={0} px={3} sx={{ backgroundColor: "" }}>
          <Box width="100%"></Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default BloomCycle;

import { HelmetProvider } from "react-helmet-async";
import { Home } from "./components/Home/Home";
import { AgeProvider } from "./hooks/ageHook";
import { BmiProvider } from "./hooks/bmiHook";
import { GenderProvider } from "./hooks/genderHook";
import { HeightProvider } from "./hooks/heightHook";
import { ModalProvider } from "./hooks/modalHook";
import { WeightProvider } from "./hooks/weightHook";
import Layout from "../../props/layout/layout";
import { Box } from "@mui/material";
import ScopedStyles from "./styles/scoped-style";

const BMICalculator: React.FC = () => {
  // globalStyles();

  return (

    <Layout>
    {/* Breadcrumbs */}
    <Box  sx={{borderRadius: 2,borderColor:"#4caf50"}}>
      <Box py={0} px={4} sx={{backgroundColor: "#fff",
                              borderRadius: 2,
                              borderBottomLeftRadius:0,
                              borderBottomRightRadius:0,
                              borderColor:"#cddc39"}}>
          <Box width="100%">
            <Box width="100%">
              {/* <Typography variant="h5" component="h1" my={1} fontWeight={400} sx={{color:'#2BBBAD'}}>
                Medicine Search
              </Typography> */}
            </Box>
          </Box>
      </Box>
     {/* widgets */}
     {/* //orange */}
    <Box  px={0} sx={{backgroundColor: ""}}>
      <Box  width="100%">
      <ScopedStyles>
      <HelmetProvider>
      <ModalProvider>
        <AgeProvider>
          <GenderProvider>
            <WeightProvider>
              <HeightProvider>
                <BmiProvider>
                  <Home/>
                </BmiProvider>
              </HeightProvider>
            </WeightProvider>
          </GenderProvider>
        </AgeProvider>
      </ModalProvider>
     </HelmetProvider>
      </ScopedStyles>
  
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
}

export default BMICalculator;

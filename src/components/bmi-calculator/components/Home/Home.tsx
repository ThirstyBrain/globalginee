import { Helmet } from "react-helmet-async";
import { Modal } from "./Modal/Modal";
import { BmiSection } from "./BmiSection/BmiSection";
import { UserDataSection } from "./UserDataSection/UserDataSection";
import { ExtraInfoSection } from "./ExtraInfoSection/ExtraInfoSection";
import { HomeMain } from "./HomeStyles";
import { CaloricNeeds } from "./CaloricNeedSection/cloric-needs";
import { EnergyExpenditure } from "./EnergyExpenditure/EnergyExpenditure";
import { IdealWeightRange } from "./IdealWeight/IdealWeight";
import { RiskFactors } from "./RiskFactor/RiskFactor";
import { Box} from "@mui/material";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Healthy | Home</title>
        <link rel="icon" href="/assets/logo.svg" />
      </Helmet>

      <HomeMain>
        <Modal />
        <UserDataSection />
        <BmiSection />
        <ExtraInfoSection />
      </HomeMain>
      <HomeMain>
      <Box
            py={2}
            px={3}
            sx={{
              backgroundColor: "",
              minWidth: "100%", // Adjust the width as needed
              Height: "1%", // Adjust the width as needed
              margin: "0 auto", // Center the box
              paddingTop:"0px"
            }}
          >
             <CaloricNeeds />
          </Box>
          <Box
            py={0}
            px={3}
            sx={{
              backgroundColor: "",
              minWidth: "100%", // Adjust the width as needed
              Height: "1%", // Adjust the width as needed
              margin: "0 auto", // Center the box
              paddingTop:"0px"
            }}
          >   <RiskFactors />
          </Box>
         
      </HomeMain>

      <HomeMain>
      <Box
            py={2}
            px={3}
            sx={{
              backgroundColor: "",
              minWidth: "100%", // Adjust the width as needed
              margin: "0 auto", // Center the box
              paddingTop:"0px"
            }}
          >
              <IdealWeightRange />
          </Box>
          <Box
            py={0}
            px={3}
            sx={{
              backgroundColor: "",
              minWidth: "100%", // Adjust the width as needed
              margin: "0 auto", // Center the box
              paddingTop:"0px"
            }}
          >   <EnergyExpenditure />
          </Box>
         
      </HomeMain>

    
        
      
    </>
  );
}

import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import CycleForm from "../components/cycleform";
import Summary from "../components/summary";
import Calendar from "../components/Calendar";

const TrackerPage: React.FC = () => {
  const [cycleData, setCycleData] = useState<{ startDate: string; cycleLength: number } | null>(
    null
  );

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Box mt={5}>
          {!cycleData ? (
            <CycleForm onSubmit={(data) => setCycleData(data)} />
          ) : (
            <>
              <Summary data={cycleData} />
              <Box mt={4}>
                <Calendar
                  startDate={cycleData.startDate}
                  cycleLength={cycleData.cycleLength}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrackerPage;

import React from "react";
import { Box, Typography } from "@mui/material";

interface SummaryProps {
  data: { startDate: string; cycleLength: number };
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const nextCycleDate = new Date(
    new Date(data.startDate).getTime() + data.cycleLength * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cycle Summary
      </Typography>
      <Typography variant="body1">Start Date: {data.startDate}</Typography>
      <Typography variant="body1">
        Next Cycle: {nextCycleDate}
      </Typography>
    </Box>
  );
};

export default Summary;

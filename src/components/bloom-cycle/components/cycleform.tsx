import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

type CycleData = {
  startDate: string;
  cycleLength: number;
};

interface CycleFormProps {
  onSubmit: (data: CycleData) => void;
}

const CycleForm: React.FC<CycleFormProps> = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState<number | "">("");

  const handleSubmit = () => {
    if (startDate && cycleLength) {
      onSubmit({ startDate, cycleLength: Number(cycleLength) });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enter Your Cycle Details
      </Typography>
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Cycle Length (days)"
        type="number"
        fullWidth
        value={cycleLength}
        onChange={(e) => setCycleLength(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default CycleForm;

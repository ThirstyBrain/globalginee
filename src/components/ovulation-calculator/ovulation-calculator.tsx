// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material";
// import dayjs, { Dayjs } from "dayjs";

// const OvulationCalculator: React.FC = () => {
//   const [lastPeriodDate, setLastPeriodDate] = useState<string>("");
//   const [cycleLength, setCycleLength] = useState<number | string>(28);
//   const [outcomes, setOutcomes] = useState<{
//     fertileWindow: string | null;
//     ovulationDate: Dayjs | null;
//     nextPeriodDate: Dayjs | null;
//     pregnancyTestDate: Dayjs | null;
//     expectedDueDate: Dayjs | null;
//   }>({
//     fertileWindow: null,
//     ovulationDate: null,
//     nextPeriodDate: null,
//     pregnancyTestDate: null,
//     expectedDueDate: null,
//   });

//   const calculateOutcomes = () => {
//     if (!lastPeriodDate || !cycleLength || isNaN(Number(cycleLength))) {
//       alert("Please provide valid inputs.");
//       return;
//     }

//     const lastDate = dayjs(lastPeriodDate);
//     const cycleLen = Number(cycleLength);

//     const ovulationDay = lastDate.add(cycleLen - 14, "day");
//     const fertileStart = ovulationDay.subtract(5, "day");
//     const fertileEnd = ovulationDay.add(1, "day");
//     const nextPeriodDay = lastDate.add(cycleLen, "day");
//     const pregnancyTestDay = ovulationDay.add(14, "day");
//     const dueDate = ovulationDay.add(38, "week");

//     setOutcomes({
//       fertileWindow: `${fertileStart.format("DD MMM, YYYY")} - ${fertileEnd.format(
//         "DD MMM, YYYY"
//       )}`,
//       ovulationDate: ovulationDay,
//       nextPeriodDate: nextPeriodDay,
//       pregnancyTestDate: pregnancyTestDay,
//       expectedDueDate: dueDate,
//     });
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 4,
//         p: 3,
//       }}
//     >
//       <Card sx={{ maxWidth: 600, width: "100%" }}>
//         <CardContent>
//           <Typography variant="h5" textAlign="center" gutterBottom>
//             Ovulation Calculator
//           </Typography>
//           <Typography variant="body2" color="text.secondary" textAlign="center">
//             Start tracking your ovulation today and take control of your fertility journey.
//           </Typography>

//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Last Period Date"
//                 value={lastPeriodDate}
//                 onChange={(e) => setLastPeriodDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Cycle Length (days)"
//                 value={cycleLength}
//                 onChange={(e) => setCycleLength(e.target.value)}
//                 InputProps={{ inputProps: { min: 21, max: 35 } }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={calculateOutcomes}
//               >
//                 Calculate
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {outcomes.ovulationDate && (
//         <Card sx={{ maxWidth: 600, width: "100%" }}>
//           <CardContent>
//             <Typography variant="h6" textAlign="center" gutterBottom>
//               Outcomes
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               <strong>Fertile Window:</strong> {outcomes.fertileWindow}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The fertile window is the time period in which a woman is most
//               likely to conceive, typically occurring around the time of
//               ovulation.
//             </Typography>

//             <Typography variant="body1" gutterBottom>
//               <strong>Ovulation Date:</strong>{" "}
//               {outcomes.ovulationDate?.format("DD MMM, YYYY")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Ovulation date is the day in a woman's menstrual cycle when an egg
//               is released from the ovary and can potentially be fertilized.
//             </Typography>

//             <Typography variant="body1" gutterBottom>
//               <strong>Next Period Date:</strong>{" "}
//               {outcomes.nextPeriodDate?.format("DD MMM, YYYY")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The Next Period Date is the date when a woman's menstrual cycle is
//               expected to begin again after the previous period.
//             </Typography>

//             <Typography variant="body1" gutterBottom>
//               <strong>Pregnancy Test Date:</strong>{" "}
//               {outcomes.pregnancyTestDate?.format("DD MMM, YYYY")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               A pregnancy test date refers to the date on which a woman takes a
//               pregnancy test to determine if she is pregnant.
//             </Typography>

//             <Typography variant="body1" gutterBottom>
//               <strong>Expected Due Date:</strong>{" "}
//               {outcomes.expectedDueDate?.format("DD MMM, YYYY")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The expected due date (EDD) is the date that a pregnant woman's
//               baby is expected to be born. The actual due date may vary by a few
//               days or weeks.
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default OvulationCalculator;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const OvulationCalculator: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [outcomes, setOutcomes] = useState<{
    fertileWindow: string | null;
    ovulationDate: Dayjs | null;
    nextPeriodDate: Dayjs | null;
    pregnancyTestDate: Dayjs | null;
    expectedDueDate: Dayjs | null;
  }>({
    fertileWindow: null,
    ovulationDate: null,
    nextPeriodDate: null,
    pregnancyTestDate: null,
    expectedDueDate: null,
  });

  useEffect(() => {
    if (lastPeriodDate && cycleLength) {
      const lastDate = dayjs(lastPeriodDate);
      const cycleLen = Number(cycleLength);

      const ovulationDay = lastDate.add(cycleLen - 14, "day");
      const fertileStart = ovulationDay.subtract(5, "day");
      const fertileEnd = ovulationDay.add(1, "day");
      const nextPeriodDay = lastDate.add(cycleLen, "day");
      const pregnancyTestDay = ovulationDay.add(14, "day");
      const dueDate = ovulationDay.add(38, "week");

      setOutcomes({
        fertileWindow: `${fertileStart.format("DD MMM, YYYY")} - ${fertileEnd.format(
          "DD MMM, YYYY"
        )}`,
        ovulationDate: ovulationDay,
        nextPeriodDate: nextPeriodDay,
        pregnancyTestDate: pregnancyTestDay,
        expectedDueDate: dueDate,
      });
    }
  }, [lastPeriodDate, cycleLength]);

  const renderCard = (
    title: string,
    date: string | null,
    description: string,
    backgroundColor: string
  ) => (
    <Card
    sx={{
      backgroundColor,
      color: "white",
      mb: 2,
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography variant="body1">{date || "N/A"}</Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="rgba(255,255,255,0.7)">
        {description}
      </Typography>
    </CardContent>
  </Card>
  );

  return (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          p: 2,
        }}
      >
        <Card sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Ovulation Calculator
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Determine your ovulation cycle. Use this calculator to pinpoint
              your most fertile days by identifying when you are likely
              ovulating.
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Last Period Date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cycle Length (days)"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 21, max: 35 } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Last Period Date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Cycle Length (days)"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            InputProps={{ inputProps: { min: 21, max: 35 } }}
          />
        </Grid>
      </Grid> */}

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
          {renderCard(
          "Fertile Window",
          outcomes.fertileWindow,
          "The fertile window is the time period in which a woman is most likely to conceive, typically occurring around the time of ovulation.",
          "#1E293B"
        )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          {renderCard(
          "Ovulation Date",
          outcomes.ovulationDate
            ? outcomes.ovulationDate.format("DD MMM, YYYY")
            : "N/A",
          "Ovulation date is the day in a woman's menstrual cycle when an egg is released from the ovary and can potentially be fertilized.",
          "#3B82F6"
        )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>{renderCard(
          "Next Period Date",
          outcomes.nextPeriodDate
            ? outcomes.nextPeriodDate.format("DD MMM, YYYY")
            : "N/A",
          "The Next Period Date is the date when a woman's menstrual cycle is expected to begin again after the previous period.",
          "#9333EA"
        )}</Grid>
          <Grid item xs={12} sm={6} md={4}> {renderCard(
          "Pregnancy Test Date",
          outcomes.pregnancyTestDate
            ? outcomes.pregnancyTestDate.format("DD MMM, YYYY")
            : "N/A",
          "A pregnancy test date refers to the date on which a woman takes a pregnancy test to determine if she is pregnant.",
          "#F59E0B"
        )}</Grid>
          <Grid item xs={12} sm={6} md={4}>        {renderCard(
          "Expected Due Date",
          outcomes.expectedDueDate
            ? outcomes.expectedDueDate.format("DD MMM, YYYY")
            : "N/A",
          "The expected due date (EDD) is the date that a pregnant woman's baby is expected to be born. The actual due date may vary by a few days or weeks.",
          "#10B981"
        )}</Grid>
        </Grid>
       
   
        
       

      </Box>
    </Box>
  );
};

export default OvulationCalculator;

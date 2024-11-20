// components/GrowthPlan.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Goal, PersonalityType } from '../models/model';
import { personalityData } from '../models/personality-data';

interface GrowthPlanProps {
  setCurrentPage: (page: string) => void; // Adding setCurrentPage as a prop
}

const GrowthPlan: React.FC<GrowthPlanProps> = ({ setCurrentPage }) => {
  const [personalityType, setPersonalityType] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [customGoal, setCustomGoal] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  //const [personalityDataitem, setpersonalityData] = useState<Record<string, PersonalityType>>({});

    // Initialize personality data and set up goals when the component mounts
    useEffect(() => {
      // Check if quiz is completed
      const completed = sessionStorage.getItem("quizCompleted") === "true";
      setQuizCompleted(completed);
  
      if (completed) {
        // Get stored personality type
        const storedPersonalityType = sessionStorage.getItem("personalityType");
        
        if (storedPersonalityType && personalityData[storedPersonalityType]) {
          setPersonalityType(storedPersonalityType);
          
          // Initialize goals for the personality type
          const recommendedGoals = personalityData[storedPersonalityType].recommendedGoals.map(rg => ({
            id: rg.id,
            title: rg.title,
            description: rg.description,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            progress: 0,
            completed: false,
            personalityTypeCode: storedPersonalityType,
            relatedTrait: rg.relatedTrait,
            exercises: [],
            notes: [],
          }));
          
          setGoals(recommendedGoals);
        }
      }
    }, []); // Empty dependency array as we only want this to run once on mount
  
    // Handle updates when personality type changes
    useEffect(() => {
      if (personalityType && personalityData[personalityType]) {
        const recommendedGoals = personalityData[personalityType].recommendedGoals.map(rg => ({
          id: rg.id,
          title: rg.title,
          description: rg.description,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          progress: 0,
          completed: false,
          personalityTypeCode: personalityType,
          relatedTrait: rg.relatedTrait,
          exercises: [],
          notes: [],
        }));
        
        setGoals(recommendedGoals);
      }
    }, [personalityType]);
  // useEffect(() => {
  //   setpersonalityData(personalityData);
  //   // Check if the quiz has been completed by reading from session storage
  //   const completed = sessionStorage.getItem("quizCompleted") === "true";
  //   setQuizCompleted(completed);
  
  //   if (completed) {
  //     // Get the personality type from sessionStorage or fall back to 'defaultType'
  //     const storedPersonalityType = sessionStorage.getItem("personalityType");
  //     const finalPersonalityType = storedPersonalityType || 'defaultType';
  
  //     // Only update the state if it's different from the previous value
  //     if (personalityType !== finalPersonalityType) {
  //       setPersonalityType(finalPersonalityType);
  //     }
  
  //     // After setting personalityType, fetch goals for the personality type
  //     if (finalPersonalityType !== null && personalityDataitem[finalPersonalityType]) {
  //       const recommendedGoals = personalityDataitem[finalPersonalityType].recommendedGoals.map(rg => ({
  //         id: rg.id,
  //         title: rg.title,
  //         description: rg.description,
  //         deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //         progress: 0,
  //         completed: false,
  //         personalityTypeCode: finalPersonalityType,
  //         relatedTrait: rg.relatedTrait,
  //         exercises: [], // Add exercises based on relatedTrait or specific logic
  //         notes: [],
  //       }));
  //       setGoals(recommendedGoals);
  //     }
  //   }
  // }, [personalityType]);  // Only run when personalityType changes
  
  

  const handleAddCustomGoal = () => {
    if (customGoal.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: customGoal,
        description: '',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        progress: 0,
        completed: false,
        personalityTypeCode: personalityType || 'Custom',
        relatedTrait: '',
        exercises: [],
        notes: [],
      };
      setGoals([...goals, newGoal]);
      setCustomGoal('');
      setDialogOpen(false);
    }
  };

  const handleUpdateProgress = (goalId: string, increment: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = Math.min(100, Math.max(0, goal.progress + increment));
        return { ...goal, progress: newProgress, completed: newProgress === 100 };
      }
      return goal;
    }));
  };

  const handleAddNote = (goalId: string) => {
    if (newNote.trim()) {
      setGoals(goals.map(goal => goal.id === goalId ? { ...goal, notes: [...goal.notes, newNote] } : goal));
      setNewNote('');
      setNoteDialogOpen(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* {quizCompleted && personalityType && personalityData[personalityType] ? ( */}
      {quizCompleted && personalityType && personalityData[personalityType] ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Personal Growth Plan for {personalityData[personalityType].name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Based on your personality type, here are some recommended areas for growth and development.
              </Typography>
            </Paper>
          </Grid>

          {/* Goals Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Your Goals</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
                  Add Custom Goal
                </Button>
              </Box>

              <Grid container spacing={2}>
                {goals.map((goal) => (
                  <Grid item xs={12} key={goal.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6">{goal.title}</Typography>
                          <Chip label={goal.relatedTrait || 'Custom'} color="secondary" size="small" />
                        </Box>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {goal.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LinearProgress variant="determinate" value={goal.progress} sx={{ flexGrow: 1, mr: 2 }} />
                          <Typography variant="body2">{goal.progress}%</Typography>
                        </Box>
                        <Button size="small" onClick={() => handleUpdateProgress(goal.id, 10)}>
                          Update Progress
                        </Button>
                        <Button size="small" onClick={() => { setSelectedGoalId(goal.id); setNoteDialogOpen(true); }}>
                          Add Note
                        </Button>
                      </CardContent>

                      {goal.notes.length > 0 && (
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Notes ({goal.notes.length})</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {goal.notes.map((note, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={note} />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please complete the personality quiz to receive your personalized growth plan.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage('quiz')} // Setting the page programmatically
          >
            Take Personality Quiz
          </Button>
        </Paper>
      )}

      {/* Add Custom Goal Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Custom Goal</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Goal Title" value={customGoal} onChange={(e) => setCustomGoal(e.target.value)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCustomGoal} variant="contained">Add Goal</Button>
        </DialogActions>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField fullWidth multiline rows={4} label="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => selectedGoalId && handleAddNote(selectedGoalId)} variant="contained">Add Note</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GrowthPlan;

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   TextField,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   LinearProgress,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
// import { Goal } from '../models/model';
// import { personalityData } from '../models/personality-data';

// interface GrowthPlanProps {
//   personalityType: string | null;
//   setCurrentPage: (page: string) => void;
// }

// const GrowthPlan: React.FC<GrowthPlanProps> = ({ personalityType, setCurrentPage }) => {
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [customGoal, setCustomGoal] = useState('');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [noteDialogOpen, setNoteDialogOpen] = useState(false);
//   const [newNote, setNewNote] = useState('');
//   const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

//   useEffect(() => {
//     if (personalityType && personalityData[personalityType]) {
//       const recommendedGoals = personalityData[personalityType].recommendedGoals.map(rg => ({
//         id: rg.id,
//         title: rg.title,
//         description: rg.description,
//         deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//         progress: 0,
//         completed: false,
//         personalityTypeCode: personalityType,
//         relatedTrait: rg.relatedTrait,
//         exercises: [],
//         notes: [],
//       }));
//       setGoals(recommendedGoals);
//     }
//   }, [personalityType]);

//   const handleAddCustomGoal = () => {
//     if (customGoal.trim()) {
//       const newGoal: Goal = {
//         id: Date.now().toString(),
//         title: customGoal,
//         description: '',
//         deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//         progress: 0,
//         completed: false,
//         personalityTypeCode: personalityType || 'Custom',
//         relatedTrait: '',
//         exercises: [],
//         notes: [],
//       };
//       setGoals([...goals, newGoal]);
//       setCustomGoal('');
//       setDialogOpen(false);
//     }
//   };

//   const handleUpdateProgress = (goalId: string, increment: number) => {
//     setGoals(goals.map(goal => {
//       if (goal.id === goalId) {
//         const newProgress = Math.min(100, Math.max(0, goal.progress + increment));
//         return { ...goal, progress: newProgress, completed: newProgress === 100 };
//       }
//       return goal;
//     }));
//   };

//   const handleAddNote = (goalId: string) => {
//     if (newNote.trim()) {
//       setGoals(goals.map(goal => goal.id === goalId ? { ...goal, notes: [...goal.notes, newNote] } : goal));
//       setNewNote('');
//       setNoteDialogOpen(false);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {personalityType && personalityData[personalityType] ? (
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Paper sx={{ p: 3 }}>
//               <Typography variant="h5" gutterBottom>
//                 Personal Growth Plan for {personalityData[personalityType].name}
//               </Typography>
//               <Typography variant="body1" color="textSecondary" paragraph>
//                 Based on your personality type, here are some recommended areas for growth and development.
//               </Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12}>
//             <Paper sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//                 <Typography variant="h6">Your Goals</Typography>
//                 <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
//                   Add Custom Goal
//                 </Button>
//               </Box>

//               <Grid container spacing={2}>
//                 {goals.map((goal) => (
//                   <Grid item xs={12} key={goal.id}>
//                     <Card>
//                       <CardContent>
//                         <Typography variant="h6">{goal.title}</Typography>
//                         <Typography color="textSecondary">{goal.description}</Typography>
//                         <LinearProgress variant="determinate" value={goal.progress} sx={{ my: 2 }} />
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button variant="contained" onClick={() => handleUpdateProgress(goal.id, 10)}>
//                             Progress +10%
//                           </Button>
//                           <Button variant="contained" color="error" onClick={() => handleUpdateProgress(goal.id, -10)}>
//                             Progress -10%
//                           </Button>
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Paper>
//           </Grid>
//         </Grid>
//       ) : (
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" color="textSecondary">
//             Please complete the personality quiz to view your growth plan.
//           </Typography>
//           <Button variant="contained" color="primary" onClick={() => setCurrentPage('quiz')}>
//             Take Quiz
//           </Button>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// export default GrowthPlan;


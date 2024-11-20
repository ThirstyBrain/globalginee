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
import personalityDataJson from "../../../assets/data/personalityData.json";

//import personalityData from '../models/personality-data'; // Ensure correct import

//import { personalityData } from '../models/personality-data';
// export const personalityData: Record<string, PersonalityType> = {
//   'INTJ': {
//     code: 'INTJ',
//     name: 'Architect',
//     description: 'Imaginative and strategic thinkers with a plan for everything.',
//     strengths: ['Strategic Planning', 'Independent Thinking', 'Complex Problem Solving'],
//     weaknesses: ['Perfectionism', 'Difficulty with Emotional Expression', 'Can be overly critical'],
//     careerSuggestions: ['Engineer', 'Strategist', 'Scientist'],
//     communicationStyle: 'Direct and focused on efficiency.',
//     stressTriggers: ['Micromanagement', 'Lack of independence', 'Emotionally charged environments'],
//     recommendedGoals: [
//       {
//         id: 'intj-1',
//         title: 'Develop Emotional Intelligence',
//         description: 'Practice recognizing and expressing emotions in a healthy way.',
//         difficulty: 'Medium',
//         timeframe: 'Long',
//         relatedTrait: 'Thinking',
//         category: 'Emotional Growth'
//       },
//       {
//         id: 'intj-2',
//         title: 'Enhance Team Collaboration',
//         description: 'Work on being more open to others\' ideas and perspectives.',
//         difficulty: 'Hard',
//         timeframe: 'Medium',
//         relatedTrait: 'Introversion', 
//         category: 'Social Skills'
//       }
//     ],
//     growthAreas: [
//       {
//         trait: 'Emotional Expression',
//         exercises: [
//           {
//             id: 'ex-1',
//             title: 'Daily Emotion Journal',
//             description: 'Spend 10 minutes writing about your emotions and their triggers.',
//             frequency: 'Daily',
//             duration: '10 minutes'
//           },
//           {
//             id: 'ex-2',
//             title: 'Active Listening Practice',
//             description: 'Practice focusing entirely on understanding others\' perspectives without planning responses.',
//             frequency: 'Weekly',
//             duration: '30 minutes'
//           }
//         ],
//         resources: [
//           {
//             id: 'res-1',
//             title: 'Understanding Emotional Intelligence',
//             type: 'Article',
//             description: 'A guide to developing emotional awareness for analytical personalities.'
//           }
//         ]
//       }
//     ]
//   },
//   'INFJ': {
//     code: 'INFJ',
//     name: 'Advocate',
//     description: 'Quiet and mystical, yet inspiring and idealistic.',
//     strengths: ['Deep Insights', 'Compassionate', 'Idealistic'],
//     weaknesses: ['Prone to burnout', 'Overly sensitive', 'Difficulty with conflict'],
//     careerSuggestions: ['Counselor', 'Writer', 'Psychologist'],
//     communicationStyle: 'Empathetic and focuses on building deep connections.',
//     stressTriggers: ['Conflict situations', 'Shallow interactions', 'Unclear values'],
//     recommendedGoals: [
//       {
//         id: 'infj-1',
//         title: 'Set Healthy Boundaries',
//         description: 'Learn to say no without guilt and maintain personal space.',
//         difficulty: 'Medium',
//         timeframe: 'Short',
//         relatedTrait: 'Feeling',
//         category: 'Productivity'
//       },
//       {
//         id: 'infj-2',
//         title: 'Practice Self-Care',
//         description: 'Incorporate relaxation and self-care into your daily routine.',
//         difficulty: 'Easy',
//         timeframe: 'Ongoing',
//         relatedTrait: 'Introversion',
//         category: 'Productivity'
//       }
//     ],
//     growthAreas: [
//       {
//         trait: 'Resilience',
//         exercises: [
//           {
//             id: 'ex-3',
//             title: 'Mindfulness Meditation',
//             description: 'Spend 15 minutes practicing mindfulness meditation.',
//             frequency: 'Daily',
//             duration: '15 minutes'
//           },
//           {
//             id: 'ex-4',
//             title: 'Expressive Writing',
//             description: 'Write about challenges and reframe negative thoughts.',
//             frequency: 'Weekly',
//             duration: '30 minutes'
//           }
//         ],
//         resources: [
//           {
//             id: 'res-2',
//             title: 'Building Emotional Resilience',
//             type: 'Course',
//             description: 'A course on coping with emotional stress and improving resilience.'
//           }
//         ]
//       }
//     ]
//   },
//   'ENTJ': {
//     code: 'ENTJ',
//     name: 'Commander',
//     description: 'Bold, imaginative, and strong-willed leaders, always finding a way – or making one.',
//     strengths: ['Confident Leadership', 'Strategic Thinking', 'Effective Communication'],
//     weaknesses: ['Intolerant', 'Impatient', 'Can be overly blunt'],
//     careerSuggestions: ['CEO', 'Executive', 'Entrepreneur'],
//     communicationStyle: 'Assertive and clear, often focused on achieving objectives.',
//     stressTriggers: ['Lack of control', 'Incompetence', 'Excessive emotions from others'],
//     recommendedGoals: [
//       {
//         id: 'entj-1',
//         title: 'Improve Patience',
//         description: 'Practice remaining calm in situations where others may work slower.',
//         difficulty: 'Hard',
//         timeframe: 'Medium',
//         relatedTrait: 'Judging',
//         category: 'Productivity'
//       },
//       {
//         id: 'entj-2',
//         title: 'Enhance Empathy',
//         description: 'Develop listening skills and understand others\' perspectives.',
//         difficulty: 'Medium',
//         timeframe: 'Long',
//         relatedTrait: 'Thinking', 
//         category: 'Organization'
//       }
//     ],
//     growthAreas: [
//       {
//         trait: 'Empathy',
//         exercises: [
//           {
//             id: 'ex-5',
//             title: 'Perspective-Taking Exercises',
//             description: 'Practice empathy by reflecting on others\' perspectives.',
//             frequency: 'Weekly',
//             duration: '20 minutes'
//           },
//           {
//             id: 'ex-6',
//             title: 'Nonviolent Communication',
//             description: 'Work on communicating needs without judgment or demands.',
//             frequency: 'Monthly',
//             duration: '1 hour'
//           }
//         ],
//         resources: [
//           {
//             id: 'res-3',
//             title: 'Developing Empathy in Leadership',
//             type: 'Workshop',
//             description: 'A workshop to improve empathetic skills in leadership contexts.'
//           }
//         ]
//       }
//     ]
//   },
  
//   // Add more personality types as needed...
// };



// Use type assertion to treat JSON data as Record<string, PersonalityType>
export const personalityData: Record<string, PersonalityType> = personalityDataJson as Record<string, PersonalityType>;

interface GrowthPlanProps {
  setCurrentPage: (page: string) => void;
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

  useEffect(() => {
    const initializeGrowthPlan = () => {
      const completed = sessionStorage.getItem("quizCompleted") === "true";
      setQuizCompleted(completed);

      if (!completed) return;

      const storedPersonalityType = sessionStorage.getItem("personalityType");
      
      if (!storedPersonalityType || !personalityData[storedPersonalityType]) {
        console.warn('Invalid or missing personality type');
        return;
      }

      setPersonalityType(storedPersonalityType);

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
    };

    initializeGrowthPlan();
  }, []); // Run only on mount

  const handleAddCustomGoal = () => {
    if (!customGoal.trim()) return;

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

    setGoals(prevGoals => [...prevGoals, newGoal]);
    setCustomGoal('');
    setDialogOpen(false);
  };

  const handleUpdateProgress = (goalId: string, increment: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id !== goalId) return goal;
        
        const newProgress = Math.min(100, Math.max(0, goal.progress + increment));
        return { 
          ...goal, 
          progress: newProgress, 
          completed: newProgress === 100 
        };
      })
    );
  };

  const handleAddNote = (goalId: string) => {
    if (!newNote.trim() || !goalId) return;

    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId
          ? { ...goal, notes: [...goal.notes, newNote] }
          : goal
      )
    );
    
    setNewNote('');
    setNoteDialogOpen(false);
  };

  if (!quizCompleted || !personalityType || !personalityData[personalityType]) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please complete the personality quiz to receive your personalized growth plan.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage('quiz')}
          >
            Take Personality Quiz
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
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

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Your Goals</Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => setDialogOpen(true)}
              >
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
                        <Chip 
                          label={goal.relatedTrait || 'Custom'} 
                          color="secondary" 
                          size="small" 
                        />
                      </Box>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {goal.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={goal.progress} 
                          sx={{ flexGrow: 1, mr: 2 }} 
                        />
                        <Typography variant="body2">
                          {goal.progress}%
                        </Typography>
                      </Box>
                      <Button 
                        size="small" 
                        onClick={() => handleUpdateProgress(goal.id, 10)}
                      >
                        Update Progress
                      </Button>
                      <Button 
                        size="small" 
                        onClick={() => {
                          setSelectedGoalId(goal.id);
                          setNoteDialogOpen(true);
                        }}
                      >
                        Add Note
                      </Button>

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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Custom Goal</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            label="Goal Title" 
            value={customGoal} 
            onChange={(e) => setCustomGoal(e.target.value)} 
            sx={{ mt: 2 }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCustomGoal} variant="contained">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            label="Note" 
            value={newNote} 
            onChange={(e) => setNewNote(e.target.value)} 
            sx={{ mt: 2 }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => selectedGoalId && handleAddNote(selectedGoalId)} 
            variant="contained"
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GrowthPlan;

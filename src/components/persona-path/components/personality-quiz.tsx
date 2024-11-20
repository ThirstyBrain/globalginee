// components/PersonalityQuiz.tsx
import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Box, 
  Button
} from '@mui/material';
import { QuizQuestion } from '../models/model';

interface PersonalityQuizProps {
  setPersonalityType: (type: string) => void;
  setCurrentPage: (page: string) => void; // This will allow you to navigate
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you prefer to spend your free time?",
    options: [
      { text: "Socializing with friends", trait: "E" },
      { text: "Quiet time alone", trait: "I" }
    ]
  },
  {
    id: 2,
    question: "When making decisions, do you rely more on...",
    options: [
      { text: "Logical analysis", trait: "T" },
      { text: "Personal feelings", trait: "F" }
    ]
  },
  {
    id: 3,
    question: "How do you approach planning your day?",
    options: [
      { text: "Prefer to go with the flow", trait: "P" },
      { text: "Prefer a detailed schedule", trait: "J" }
    ]
  },
  {
    id: 4,
    question: "When faced with a problem, you tend to...",
    options: [
      { text: "Think of practical solutions", trait: "S" },
      { text: "Consider creative possibilities", trait: "N" }
    ]
  },
  {
    id: 5,
    question: "In a group setting, are you more likely to...",
    options: [
      { text: "Take charge of the situation", trait: "E" },
      { text: "Let others take the lead", trait: "I" }
    ]
  },
  {
    id: 6,
    question: "Do you prefer to focus on...",
    options: [
      { text: "Details and specifics", trait: "S" },
      { text: "The big picture", trait: "N" }
    ]
  },
  {
    id: 7,
    question: "When working on a task, do you prefer...",
    options: [
      { text: "To decide based on objective criteria", trait: "T" },
      { text: "To decide based on how others feel", trait: "F" }
    ]
  },
  {
    id: 8,
    question: "How do you handle deadlines?",
    options: [
      { text: "I work in advance", trait: "J" },
      { text: "I tend to wait until the last minute", trait: "P" }
    ]
  },
  {
    id: 9,
    question: "When thinking about future goals, do you...",
    options: [
      { text: "Focus on realistic expectations", trait: "S" },
      { text: "Consider all possible opportunities", trait: "N" }
    ]
  },
  {
    id: 10,
    question: "In social settings, do you prefer...",
    options: [
      { text: "Being with a large group", trait: "E" },
      { text: "Being with a few close friends", trait: "I" }
    ]
  }
];


const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ setPersonalityType, setCurrentPage }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < sampleQuestions.length ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculatePersonalityType = () => {
    const traitCount: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach((trait) => {
      traitCount[trait]++;
    });

    const personalityType = 
      (traitCount["E"] >= traitCount["I"] ? "E" : "I") +
      (traitCount["S"] >= traitCount["N"] ? "S" : "N") +
      (traitCount["T"] >= traitCount["F"] ? "T" : "F") +
      (traitCount["J"] >= traitCount["P"] ? "J" : "P");

    setPersonalityType(personalityType);
    // Save quiz completion status to session storage
    sessionStorage.setItem("quizCompleted", "true");
    sessionStorage.setItem("personalityType",personalityType);
    //navigate('/dashboard');
     // After calculating the personality type, navigate to the dashboard
     //setCurrentPage('growth');
     setCurrentPage('dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Personality Quiz
      </Typography>
      {currentQuestion < sampleQuestions.length ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            {sampleQuestions[currentQuestion].question}
          </Typography>
          <RadioGroup>
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.trait}
                control={<Radio />}
                label={option.text}
                onChange={() => handleAnswer(option.trait)}
              />
            ))}
          </RadioGroup>
        </Box>
      ) : (
        // When currentQuestion >= sampleQuestions.length, display the "Submit and View Results" button
        <Button
          variant="contained"
          color="primary"
          onClick={calculatePersonalityType}
        >
          Submit and View Results
        </Button>
      )}
    </Paper>
  </Container>
  
  );
};

export default PersonalityQuiz;
  
  // // components/Dashboard.tsx
  // import React from 'react';
  // import { Container, Typography, Paper, Grid } from '@mui/material';
  
  // interface DashboardProps {
  //   personalityType: string | null;
  // }
  
  // const Dashboard: React.FC<DashboardProps> = ({ personalityType }) => {
  //   return (
  //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  //       <Grid container spacing={3}>
  //         <Grid item xs={12}>
  //           <Paper sx={{ p: 3 }}>
  //             <Typography variant="h4" gutterBottom>
  //               Welcome to PersonaBoost
  //             </Typography>
  //             {personalityType ? (
  //               <Typography>
  //                 Your personality type: {personalityType}
  //               </Typography>
  //             ) : (
  //               <Typography>
  //                 Take our personality quiz to discover your MBTI type!
  //               </Typography>
  //             )}
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   );
  // };
  
  // export default Dashboard;
  
  import React from 'react';
  import { Container, Typography, Paper, Grid, Box, Card, CardContent, Button } from '@mui/material';
  import { Pie } from 'react-chartjs-2';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  interface DashboardProps {
    personalityType: string | null;
    setCurrentPage: (page: string) => void;
  }
  
  const personalityDescriptions: Record<string, string> = {
    "INFJ": "The Advocate - Thoughtful, insightful, and compassionate.",
    "INTJ": "The Architect - Innovative, independent, and strategic.",
    "ENFJ": "The Protagonist - Charismatic, inspiring, and empathetic.",
    "ENTJ": "The Commander - Assertive, strategic, and focused on efficiency.",
    "ISFJ": "The Defender - Compassionate, loyal, reliable,Caring, detail-oriented, and responsible.",
    "ISTJ": "The Logistician - Practical, reliable, and structured.",
    "ESFJ": "The Consul - Social, supportive, and organized.",
    "ESTJ": "The Executive - Efficient, realistic, and orderly.",
    "INFP": "The Mediator - Creative, idealistic, and empathetic.",
    "ISFP": "The Adventurer - Artistic, spontaneous, and gentle.",
    "ENFP": "The Campaigner - Enthusiastic, imaginative, and curious.",
    "ESTP": "The Entrepreneur - Energetic, action-oriented, and perceptive.",
    "ENTP": "The Debater - Clever, resourceful, and outgoing.",
    "ESFP": "The Entertainer - Fun-loving, spontaneous, and sociable.",
  };
  
  const chartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'right', // Set legend position to 'right'
        labels: {
          boxWidth: 20, // Optional: control the width of the legend's color box
        },
      },
    },
  };
  
  const Dashboard: React.FC<DashboardProps> = ({ personalityType, setCurrentPage }) => {
    const getPersonalityDescription = (type: string | null) => {
      if (!type) return "Please take the quiz to discover your personality type.";
      return personalityDescriptions[type] || "Detailed description not available.";
    };
  
    const getRecommendations = (type: string | null) => {
      switch (type) {
        case "INFJ":
          return "Focus on self-care. Trust your intuition and allow your natural compassion to guide your decisions.";
        case "INTJ":
          return "Explore new strategies for problem-solving and innovation. Don't be afraid to collaborate with others.";
        case "ENFJ":
          return "Leverage your communication skills to inspire and motivate others in your personal and professional life.";
        case "ENTJ":
          return "Continue honing your leadership skills, and consider guiding teams to achieve their goals.";
        case "ISFJ":
          return "Trust your instincts and continue to care for others while maintaining healthy boundaries.";
        case "ISTJ":
          return "Explore ways to bring structure and organization to others, while keeping an open mind for new methods.";
        case "ESFJ":
          return "Focus on developing deeper connections with others and exploring new ways to lead with empathy.";
        case "ESTJ":
          return "Consider stepping into new leadership roles where you can implement your efficiency and strategic mindset.";
        default:
          return "Take the quiz to get personalized recommendations.";
      }
    };
  

    const calculateChartData = (personalityType: string | null) => {
      if (!personalityType) return [0, 0, 0, 0]; // No personality type selected
    
      // Define the trait counts with more explicit type definitions
      const traitCounts = {
        'E/I': { E: 0, I: 0 },
        'S/N': { S: 0, N: 0 },
        'T/F': { T: 0, F: 0 },
        'J/P': { J: 0, P: 0 },
      } as const; // Using `as const` makes the structure of traitCounts immutable and ensures we get exact keys
    
      // Map personality type to the traits
      const typeMapping: Record<string, keyof typeof traitCounts> = {
        'E': 'E/I',
        'I': 'E/I',
        'S': 'S/N',
        'N': 'S/N',
        'T': 'T/F',
        'F': 'T/F',
        'J': 'J/P',
        'P': 'J/P',
      };
    
      // Count the occurrences of each trait in the personality type
      for (const char of personalityType) {
        const trait = typeMapping[char]; // Get the category
        if (trait) {
          // We know here that trait is one of the keys in `traitCounts`
          // We can now safely index into `traitCounts[trait]` and increment the count
          traitCounts[trait][char as keyof typeof traitCounts[typeof trait]]++;
        }
      }
    
      // Calculate the percentages (out of 100)
      const totalQuestions = 4; // We have 4 categories (E/I, S/N, T/F, J/P)
      const data = [
        (traitCounts['E/I'].E / totalQuestions) * 100,  // E vs I
        (traitCounts['S/N'].S / totalQuestions) * 100,  // S vs N
        (traitCounts['T/F'].T / totalQuestions) * 100,  // T vs F
        (traitCounts['J/P'].J / totalQuestions) * 100,  // J vs P
      ];
    
      return data;
    };
    

    const setGrowthPlan = () => {
   
         setCurrentPage('growth');
    };
    
    
  
    const chartData = {
      labels: ['E/I', 'S/N', 'T/F', 'J/P'],
      datasets: [
        {
          label: 'Personality Type Distribution',
          data: calculateChartData(personalityType),//[25, 25, 25, 25], // Default values for demonstration, these would be calculated from personalityType
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
        },
      ],
    };

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              {personalityType ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Your personality type: {personalityType}
                  </Typography>
                  <Box sx={{ mb: 1, width: 150, height: 150, mx: "auto" }}>
                    <Pie data={chartData} options={chartOptions} />
                  </Box>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Description
                      </Typography>
                      <Typography>
                        {getPersonalityDescription(personalityType)}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recommendations
                      </Typography>
                      <Typography>
                        {getRecommendations(personalityType)}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={setGrowthPlan}
                  >
                    Set your Growth Plan
                  </Button>
                </>
              ) : (
                <Typography>
                  Take our personality quiz to discover your MBTI type!
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default Dashboard;
  
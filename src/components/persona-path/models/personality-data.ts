import { PersonalityType } from "./model";

export const personalityData: Record<string, PersonalityType> = {
    'INTJ': {
      code: 'INTJ',
      name: 'Architect',
      description: 'Imaginative and strategic thinkers with a plan for everything.',
      strengths: ['Strategic Planning', 'Independent Thinking', 'Complex Problem Solving'],
      weaknesses: ['Perfectionism', 'Difficulty with Emotional Expression', 'Can be overly critical'],
      careerSuggestions: ['Engineer', 'Strategist', 'Scientist'],
      communicationStyle: 'Direct and focused on efficiency.',
      stressTriggers: ['Micromanagement', 'Lack of independence', 'Emotionally charged environments'],
      recommendedGoals: [
        {
          id: 'intj-1',
          title: 'Develop Emotional Intelligence',
          description: 'Practice recognizing and expressing emotions in a healthy way.',
          difficulty: "Medium",
          timeframe: 'Long',
          relatedTrait: 'Thinking',
          category: 'Emotional Growth'
        },
        {
          id: 'intj-2',
          title: 'Enhance Team Collaboration',
          description: 'Work on being more open to others\' ideas and perspectives.',
          difficulty: "Hard",
          timeframe: "Medium",
          relatedTrait: 'Introversion', 
          category: 'Social Skills'
        }
      ],
      growthAreas: [
        {
          trait: 'Emotional Expression',
          exercises: [
            {
              id: 'ex-1',
              title: 'Daily Emotion Journal',
              description: 'Spend 10 minutes writing about your emotions and their triggers.',
              frequency: 'Daily',
              duration: '10 minutes'
            },
            {
              id: 'ex-2',
              title: 'Active Listening Practice',
              description: 'Practice focusing entirely on understanding others\' perspectives without planning responses.',
              frequency: 'Weekly',
              duration: '30 minutes'
            }
          ],
          resources: [
            {
              id: 'res-1',
              title: 'Understanding Emotional Intelligence',
              type: 'Article',
              description: 'A guide to developing emotional awareness for analytical personalities.'
            }
          ]
        }
      ]
    },
    'INFJ': {
      code: 'INFJ',
      name: 'Advocate',
      description: 'Quiet and mystical, yet inspiring and idealistic.',
      strengths: ['Deep Insights', 'Compassionate', 'Idealistic'],
      weaknesses: ['Prone to burnout', 'Overly sensitive', 'Difficulty with conflict'],
      careerSuggestions: ['Counselor', 'Writer', 'Psychologist'],
      communicationStyle: 'Empathetic and focuses on building deep connections.',
      stressTriggers: ['Conflict situations', 'Shallow interactions', 'Unclear values'],
      recommendedGoals: [
        {
          id: 'infj-1',
          title: 'Set Healthy Boundaries',
          description: 'Learn to say no without guilt and maintain personal space.',
          difficulty: "Medium",
          timeframe: "Short",
          relatedTrait: 'Feeling',
          category: 'Productivity'
        },
        {
          id: 'infj-2',
          title: 'Practice Self-Care',
          description: 'Incorporate relaxation and self-care into your daily routine.',
          difficulty: "Easy",
          timeframe: "Ongoing",
          relatedTrait: 'Introversion',
          category: 'Productivity'
        }
      ],
      growthAreas: [
        {
          trait: 'Resilience',
          exercises: [
            {
              id: 'ex-3',
              title: 'Mindfulness Meditation',
              description: 'Spend 15 minutes practicing mindfulness meditation.',
              frequency: 'Daily',
              duration: '15 minutes'
            },
            {
              id: 'ex-4',
              title: 'Expressive Writing',
              description: 'Write about challenges and reframe negative thoughts.',
              frequency: 'Weekly',
              duration: '30 minutes'
            }
          ],
          resources: [
            {
              id: 'res-2',
              title: 'Building Emotional Resilience',
              type: 'Course',
              description: 'A course on coping with emotional stress and improving resilience.'
            }
          ]
        }
      ]
    },
    'ENTJ': {
      code: 'ENTJ',
      name: 'Commander',
      description: 'Bold, imaginative, and strong-willed leaders, always finding a way – or making one.',
      strengths: ['Confident Leadership', 'Strategic Thinking', 'Effective Communication'],
      weaknesses: ['Intolerant', 'Impatient', 'Can be overly blunt'],
      careerSuggestions: ['CEO', 'Executive', 'Entrepreneur'],
      communicationStyle: 'Assertive and clear, often focused on achieving objectives.',
      stressTriggers: ['Lack of control', 'Incompetence', 'Excessive emotions from others'],
      recommendedGoals: [
        {
          id: 'entj-1',
          title: 'Improve Patience',
          description: 'Practice remaining calm in situations where others may work slower.',
          difficulty: "Hard",
          timeframe: "Medium",
          relatedTrait: 'Judging',
          category: 'Productivity'
        },
        {
          id: 'entj-2',
          title: 'Enhance Empathy',
          description: 'Develop listening skills and understand others\' perspectives.',
          difficulty: "Medium",
          timeframe: "Long",
          relatedTrait: 'Thinking', 
          category: 'Organization'
        }
      ],
      growthAreas: [
        {
          trait: 'Empathy',
          exercises: [
            {
              id: 'ex-5',
              title: 'Perspective-Taking Exercises',
              description: 'Practice empathy by reflecting on others\' perspectives.',
              frequency: 'Weekly',
              duration: '20 minutes'
            },
            {
              id: 'ex-6',
              title: 'Nonviolent Communication',
              description: 'Work on communicating needs without judgment or demands.',
              frequency: 'Monthly',
              duration: '1 hour'
            }
          ],
          resources: [
            {
              id: 'res-3',
              title: 'Developing Empathy in Leadership',
              type: 'Workshop',
              description: 'A workshop to improve empathetic skills in leadership contexts.'
            }
          ]
        }
      ]
    },
    // Add more personality types as needed...
  };


  
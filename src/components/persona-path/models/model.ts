// types.ts
export interface PersonalityType {
    code: string;
    name: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
    careerSuggestions: string[];
    communicationStyle: string;
    stressTriggers: string[];
    recommendedGoals: RecommendedGoal[];
    growthAreas: GrowthArea[];
  }
  
  export interface QuizQuestion {
    id: number;
    question: string;
    options: {
      text: string;
      trait: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
    }[];
  }
  
  export interface RecommendedGoal {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeframe: 'Short' | 'Medium' | 'Long' | 'Ongoing';
    relatedTrait: string;
    category: string;
}

  
  export interface GrowthArea {
    trait: string;
    exercises: Exercise[];
    resources: Resource[];
  }
  
  export interface Exercise {
    id: string;
    title: string;
    description: string;
    frequency: string;
    duration: string;
  }
  
  export interface Resource {
    id: string;
    title: string;
    type: 'Article' | 'Video' | 'Book' | 'Exercise'|'Course'|'Workshop';
    link?: string;
    description: string;
  }
  

  export interface Goal {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    progress: number;
    completed: boolean;
    personalityTypeCode: string;
    relatedTrait: string;
    exercises: Exercise[];
    notes: string[];
  }
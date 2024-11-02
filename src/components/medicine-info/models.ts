export interface Medicine {
    id: string;
    name: string;
    genericName: string;
    usages: string[];
    sideEffects: string[];
    alternatives: Medicine[];
    interactions: {
      medicines: string[];
      description: string;
    }[];
  }
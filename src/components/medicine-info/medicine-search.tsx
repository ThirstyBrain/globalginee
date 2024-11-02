import React, { useState, useEffect, useCallback } from 'react';
//import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Alert,
    Input,
    Button,
  } from '@mui/material';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Medicine } from './models';
import medicinesData from '../../assets/data/medicines.json';


// Custom debounce implementation
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom Collapsible Component
// const Collapsible: React.FC<{
//   title: string;
//   children: React.ReactNode;
// }> = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border rounded-lg mb-2">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-2 flex justify-between items-center hover:bg-gray-50"
//       >
//         <span className="font-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-4 w-4" />
//         ) : (
//           <ChevronDown className="h-4 w-4" />
//         )}
//       </button>
//       {isOpen && <div className="p-4 border-t">{children}</div>}
//     </div>
//   );
// };

interface CollapsibleProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    headerPadding?: string;  // For button padding
    contentPadding?: string; // For content padding
  }
  
  const Collapsible: React.FC<CollapsibleProps> = ({ 
    title, 
    children, 
    defaultOpen = true,
    headerPadding = "py-3",  // Default padding
    contentPadding = "p-4"   // Default padding
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
  
    return (
      <div className="border rounded-lg mb-2 shadow-sm">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full justify-between items-center h-auto px-4 hover:bg-slate-50 ${headerPadding}`}
        >
          <span className="font-medium">{title}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>
        {isOpen && (
          <div className={`border-t ${contentPadding}`}>
            {children}
          </div>
        )}
      </div>
    );
  };
  

// Sample data


const MedicineSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Load medicines from JSON
  useEffect(() => {
    setMedicines(medicinesData);
  }, []);

const sampleMedicines: Medicine[] = medicines;

  // Search function
  const searchMedicines = useCallback((query: string) => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      const results = sampleMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(query.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  }, [sampleMedicines]);

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      searchMedicines(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, searchMedicines]);

  const renderMedicineCard = (medicine: Medicine) => (
    <Card key={medicine.id} className="mb-4 py-4">
      <CardHeader>
        <Typography className="text-xl">
          {medicine.name} ({medicine.genericName})
        </Typography>
      </CardHeader>
      <CardContent>
      <Typography className="text-xl">
          {medicine.name} ({medicine.genericName})
        </Typography>
        <Collapsible  title="Usages"  headerPadding="py-4"
        contentPadding="p-2">
          <ul className="list-disc pl-6">
            {medicine.usages.map((usage, index) => (
              <li key={index} className="mb-1">{usage}</li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible title="Side Effects"  headerPadding="py-2"
        contentPadding="p-2">
          <ul className="list-disc pl-6">
            {medicine.sideEffects.map((effect, index) => (
              <li key={index} className="mb-1">{effect}</li>
            ))}
          </ul>
        </Collapsible>

        <Collapsible title="Drug Interactions"  headerPadding="py-2"
        contentPadding="p-2">
          {medicine.interactions.map((interaction, index) => (
            <Alert key={index} className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <div className="ml-2">
                  <strong>Interacts with: </strong>
                  {interaction.medicines.join(", ")}
                  <br />
                  {interaction.description}
              </div>
            </Alert>
          ))}
        </Collapsible>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto p-4" >
      <Card className="mb-6 py-4" >
        <CardHeader>
          <Typography>Medicine Information Search</Typography>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center py-4">Loading...</div>
      )}

      {!isLoading && searchResults.length === 0 && debouncedSearchQuery.length >= 2 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <div className="ml-2">
               No medicines found matching your search.
          </div>
        </Alert>
      )}

      {searchResults.map(renderMedicineCard)}
    </div>
  );
};

export default MedicineSearch;
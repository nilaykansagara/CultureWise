export interface Question {
  category: 'Cultural Fit' | 'Technical' | 'Behavioral' | 'Situational';
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  followUp?: string;
}

export interface QuestionRequest {
  companyCulture: string;
  jobRequirements: string;
}

export interface QuestionResponse {
  questions: Question[];
  status: 'success' | 'error';
  message?: string;
} 
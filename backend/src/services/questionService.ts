import { Question } from '../types/question';

const categories: Question['category'][] = [
  'Cultural Fit',
  'Technical',
  'Behavioral',
  'Situational'
];

const mockQuestions: Record<Question['category'], Array<{
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  followUp?: string;
}>> = {
  'Cultural Fit': [
    {
      text: 'How do you align with our company values of innovation and collaboration?',
      difficulty: 'Easy',
      followUp: 'Can you provide a specific example from your past experience?'
    },
    {
      text: 'Describe your ideal work environment and how it matches our remote-first culture.',
      difficulty: 'Medium',
      followUp: 'How do you stay connected with team members in a remote setting?'
    },
    {
      text: 'How do you handle workplace diversity and inclusion in your daily work?',
      difficulty: 'Medium',
      followUp: 'What initiatives have you supported or would you implement to improve diversity?'
    },
    {
      text: 'What motivates you in a team setting and how do you contribute to team success?',
      difficulty: 'Easy',
      followUp: 'How do you handle conflicts within a team?'
    },
    {
      text: 'How do you contribute to company culture in a remote environment?',
      difficulty: 'Hard',
      followUp: 'What specific initiatives would you propose to strengthen our culture?'
    }
  ],
  'Technical': [
    {
      text: 'Explain your experience with React and TypeScript in large-scale applications.',
      difficulty: 'Medium',
      followUp: 'What challenges have you faced with state management in React?'
    },
    {
      text: 'Describe your approach to designing scalable microservices architecture.',
      difficulty: 'Hard',
      followUp: 'How do you handle service discovery and communication between services?'
    },
    {
      text: 'How do you stay updated with the latest technologies and best practices?',
      difficulty: 'Easy',
      followUp: 'What resources do you use for learning new technologies?'
    },
    {
      text: 'What tools and frameworks do you use for CI/CD pipelines?',
      difficulty: 'Medium',
      followUp: 'How do you ensure security in your CI/CD processes?'
    },
    {
      text: 'How do you handle technical debt in a fast-paced development environment?',
      difficulty: 'Hard',
      followUp: 'What strategies have you used to balance technical debt with business requirements?'
    }
  ],
  'Behavioral': [
    {
      text: 'Describe a challenging project you worked on and how you overcame obstacles.',
      difficulty: 'Medium',
      followUp: 'What would you do differently if you faced a similar challenge again?'
    },
    {
      text: 'How do you handle conflicts with team members or stakeholders?',
      difficulty: 'Medium',
      followUp: 'Can you provide a specific example of a conflict you resolved?'
    },
    {
      text: 'Tell me about a successful team project you led or contributed to significantly.',
      difficulty: 'Easy',
      followUp: 'What was your specific role and what did you learn from the experience?'
    },
    {
      text: 'How do you manage deadlines and prioritize tasks when facing multiple projects?',
      difficulty: 'Medium',
      followUp: 'What tools or methods do you use for task management?'
    },
    {
      text: 'Describe your leadership style and how you adapt it to different team members.',
      difficulty: 'Hard',
      followUp: 'How do you handle underperforming team members?'
    }
  ],
  'Situational': [
    {
      text: 'How would you handle a difficult client who is constantly changing requirements?',
      difficulty: 'Medium',
      followUp: 'What communication strategies would you use to manage expectations?'
    },
    {
      text: 'What would you do in a crisis situation where a critical system is down?',
      difficulty: 'Hard',
      followUp: 'How would you communicate with stakeholders during the crisis?'
    },
    {
      text: 'How do you prioritize tasks when everything seems urgent?',
      difficulty: 'Easy',
      followUp: 'What criteria do you use to determine task priority?'
    },
    {
      text: 'How would you improve our current development process?',
      difficulty: 'Medium',
      followUp: 'What specific metrics would you use to measure the success of these improvements?'
    },
    {
      text: 'How do you handle failure in a project and what do you learn from it?',
      difficulty: 'Hard',
      followUp: 'Can you provide a specific example of a project failure and what you learned?'
    }
  ]
};

export async function generateQuestions(
  companyCulture: string,
  jobRequirements: string
): Promise<Question[]> {
  console.log('Processing company culture:', companyCulture.substring(0, 100) + '...');
  console.log('Processing job requirements:', jobRequirements.substring(0, 100) + '...');

  // Extract technologies and skills from job requirements
  const techKeywords = extractKeywords(jobRequirements);
  console.log('Extracted technologies:', techKeywords);

  const questions: Question[] = [];
  
  categories.forEach(category => {
    mockQuestions[category].forEach(({ text, difficulty, followUp }) => {
      // Customize question based on job requirements
      let customizedText = text;
      
      if (category === 'Technical' && techKeywords.length > 0) {
        // Replace generic tech references with specific ones from job requirements
        const randomTech = techKeywords[Math.floor(Math.random() * techKeywords.length)];
        customizedText = text.replace(/React|TypeScript|Node\.js|microservices|CI\/CD/g, randomTech);
      }
      
      // Add company culture reference
      const cultureReference = extractCultureReference(companyCulture);
      if (cultureReference) {
        customizedText += ` (Considering our ${cultureReference})`;
      }
      
      questions.push({
        category,
        text: customizedText,
        difficulty,
        followUp
      });
    });
  });

  console.log(`Generated ${questions.length} questions`);
  return questions;
}

// Helper function to extract keywords from job requirements
function extractKeywords(text: string): string[] {
  const commonTech = [
    'React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'Node.js', 
    'Python', 'Java', 'C#', 'Go', 'Rust', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'GraphQL', 'REST', 'SQL', 'NoSQL',
    'MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kafka',
    'Microservices', 'Serverless', 'CI/CD', 'Jenkins', 'GitLab CI',
    'Terraform', 'Ansible', 'Kubernetes', 'Helm', 'Prometheus',
    'Grafana', 'ELK Stack', 'Splunk', 'Jira', 'Confluence'
  ];
  
  const keywords: string[] = [];
  
  commonTech.forEach(tech => {
    if (text.includes(tech)) {
      keywords.push(tech);
    }
  });
  
  return keywords.length > 0 ? keywords : ['React', 'Node.js', 'TypeScript'];
}

// Helper function to extract a reference to company culture
function extractCultureReference(text: string): string | null {
  const culturePatterns = [
    /values? of ([^,.]+)/i,
    /culture (?:is|are) (?:built on|based on) ([^,.]+)/i,
    /foster (?:a|an) ([^,.]+) environment/i,
    /workplace is ([^,.]+)/i
  ];
  
  for (const pattern of culturePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
} 
import { Question } from '../types.ts'

interface QuestionListProps {
  questions: Question[]
}

export function QuestionList({ questions }: QuestionListProps) {
  const categories = ['Cultural Fit', 'Technical', 'Behavioral', 'Situational']
  const questionsByCategory = categories.reduce((acc, category) => {
    acc[category] = questions.filter(q => q.category === category)
    return acc
  }, {} as Record<string, Question[]>)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generated Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-primary-dark mb-4">{category}</h3>
            <ul className="space-y-4">
              {questionsByCategory[category].map((question, index) => (
                <li
                  key={index}
                  className="p-4 bg-primary-light rounded-md hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                        question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty === 'Easy' ? 'E' :
                         question.difficulty === 'Medium' ? 'M' : 'H'}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{question.text}</p>
                      {question.followUp && (
                        <p className="text-gray-500 text-sm mt-1">{question.followUp}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
} 
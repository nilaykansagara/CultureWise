import { useState } from 'react'
import { QuestionGenerator } from './components/QuestionGenerator'
import { QuestionList } from './components/QuestionList'
import { Question } from './types'
import './App.css'

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('')

  const handleGenerateQuestions = async (companyCulture: string, jobRequirements: string) => {
    setIsLoading(true)
    setError(null)
    setStatus('Analyzing company culture and job requirements...')

    try {
      const formData = new FormData()
      formData.append('companyCulture', companyCulture)
      formData.append('jobRequirements', jobRequirements)

      setStatus('Generating tailored interview questions...')
      
      const response = await fetch('http://localhost:3000/api/questions/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate questions')
      }

      setStatus('Processing and categorizing questions...')
      const data = await response.json()
      
      setStatus('Questions generated successfully!')
      setQuestions(data.questions)
      
      // Clear status after a delay
      setTimeout(() => {
        setStatus('')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setStatus('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-2">CultureWise</h1>
          <p className="text-gray-600">AI-powered interview question generator</p>
        </header>

        <main>
          <QuestionGenerator
            onGenerate={handleGenerateQuestions}
            isLoading={isLoading}
          />

          {status && (
            <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {status}
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {questions.length > 0 && (
            <QuestionList questions={questions} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

interface QuestionGeneratorProps {
  onGenerate: (companyCulture: string, jobRequirements: string) => void
  isLoading: boolean
}

export function QuestionGenerator({ onGenerate, isLoading }: QuestionGeneratorProps) {
  const [companyCulture, setCompanyCulture] = useState('')
  const [jobRequirements, setJobRequirements] = useState('')
  const [cultureFile, setCultureFile] = useState<File | null>(null)
  const [requirementsFile, setRequirementsFile] = useState<File | null>(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        if (event.target.name === 'culture') {
          setCompanyCulture(text)
        } else {
          setJobRequirements(text)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(companyCulture, jobRequirements)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Culture
          </label>
          <div className="flex items-center space-x-4">
            <textarea
              value={companyCulture}
              onChange={(e) => setCompanyCulture(e.target.value)}
              className="flex-1 min-h-[100px] p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter or upload company culture..."
            />
            <div className="relative">
              <input
                type="file"
                name="culture"
                onChange={(e) => handleFileChange(e, setCultureFile)}
                className="hidden"
                id="culture-upload"
                accept=".txt,.pdf"
              />
              <label
                htmlFor="culture-upload"
                className="cursor-pointer p-2 text-primary hover:text-primary-dark"
              >
                <CloudArrowUpIcon className="h-6 w-6" />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Requirements
          </label>
          <div className="flex items-center space-x-4">
            <textarea
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
              className="flex-1 min-h-[100px] p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter or upload job requirements..."
            />
            <div className="relative">
              <input
                type="file"
                name="requirements"
                onChange={(e) => handleFileChange(e, setRequirementsFile)}
                className="hidden"
                id="requirements-upload"
                accept=".txt,.pdf"
              />
              <label
                htmlFor="requirements-upload"
                className="cursor-pointer p-2 text-primary hover:text-primary-dark"
              >
                <CloudArrowUpIcon className="h-6 w-6" />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !companyCulture || !jobRequirements}
          className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Questions...
            </>
          ) : (
            'Generate Questions'
          )}
        </button>
      </div>
    </form>
  )
} 
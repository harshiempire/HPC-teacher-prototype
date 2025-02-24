import type { PracticeTest, Question, TestConfig } from '@/types/tests'

// Load tests from localStorage
const loadTests = (): PracticeTest[] => {
  const savedTests = localStorage.getItem('practiceTests')
  return savedTests ? JSON.parse(savedTests) : []
}

// Save tests to localStorage
const saveTests = (tests: PracticeTest[]) => {
  localStorage.setItem('practiceTests', JSON.stringify(tests))
}

// Mock function to generate questions based on subject and chapters
export function generateQuestions(config: TestConfig): Question[] {
  const questions: Question[] = []
  
  // Generate questions for each difficulty level
  Object.entries(config.questionDistribution).forEach(([difficulty, count]) => {
    for (let i = 0; i < count; i++) {
      // Randomly select a chapter for each question
      const chapter = config.chapters[Math.floor(Math.random() * config.chapters.length)]
      
      questions.push({
        id: `q${questions.length + 1}`,
        text: `Question ${i + 1} for ${config.subject} - ${chapter}`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        difficulty: difficulty as 'easy' | 'medium' | 'hard'
      })
    }
  })
  
  // Shuffle questions
  return questions.sort(() => Math.random() - 0.5)
}

// Initialize practice tests from localStorage
export const practiceTests: PracticeTest[] = loadTests()

// Add a test
export const addTest = (test: PracticeTest) => {
  practiceTests.push(test)
  saveTests(practiceTests)
}

// Update a test
export const updateTest = (test: PracticeTest) => {
  const index = practiceTests.findIndex(t => t.id === test.id)
  if (index !== -1) {
    practiceTests[index] = test
    saveTests(practiceTests)
  }
}
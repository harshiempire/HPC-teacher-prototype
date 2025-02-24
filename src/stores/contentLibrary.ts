import type { Subject, GlobalContent, Category,  } from '@/types/contentLibrary'

export const resourceTypeInfo = {
  textbook: { label: 'Textbooks', color: 'bg-blue-100 text-blue-800' },
  workbook: { label: 'Workbooks', color: 'bg-green-100 text-green-800' },
  worksheet: { label: 'Worksheets', color: 'bg-yellow-100 text-yellow-800' },
  flashcard: { label: 'Flashcards', color: 'bg-orange-100 text-orange-800' },
  mindmap: { label: 'Mind Maps', color: 'bg-purple-100 text-purple-800' },
  simulation: { label: 'Simulations', color: 'bg-indigo-100 text-indigo-800' },
  video: { label: 'Video Lessons', color: 'bg-red-100 text-red-800' },
  podcast: { label: 'Podcasts', color: 'bg-pink-100 text-pink-800' },
  document: { label: 'Documents', color: 'bg-gray-100 text-gray-800' },
  audio: { label: 'Audio', color: 'bg-teal-100 text-teal-800' },
  image: { label: 'Images', color: 'bg-amber-100 text-amber-800' }
}

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    chapters: [
      {
        id: 'math-1',
        name: 'Algebra',
        resources: {
          textbooks: [
            {
              id: 'text-1',
              title: 'Algebra Fundamentals',
              type: 'textbook',
              format: 'PDF',
              url: '/path/to/resource',
              likes: 156,
              views: 1200,
              uploadedAt: '2025-03-01'
            }
          ],
          workbooks: [
            {
              id: 'work-1',
              title: 'Algebra Practice Workbook',
              type: 'workbook',
              format: 'PDF',
              url: '/path/to/resource',
              likes: 89,
              views: 750,
              uploadedAt: '2025-03-01'
            }
          ],
          worksheets: [],
          flashcards: [],
          mindmaps: [
            {
              id: 'mind-1',
              title: 'Algebraic Concepts Map',
              type: 'mindmap',
              format: 'PNG',
              url: '/path/to/resource',
              likes: 234,
              views: 1500,
              uploadedAt: '2025-03-01'
            }
          ],
          simulations: [],
          videos: [
            {
              id: 'vid-1',
              title: 'Understanding Quadratic Equations',
              type: 'video',
              format: 'MP4',
              url: '/path/to/resource',
              likes: 345,
              views: 2100,
              uploadedAt: '2025-03-01'
            }
          ],
          podcasts: []
        }
      }
    ]
  }
]

export const globalContent: GlobalContent[] = [
  {
    id: 'global-1',
    title: 'Advanced Mathematics Concepts',
    type: 'video',
    format: 'MP4',
    url: '/path/to/resource',
    uploadedBy: 'John Smith',
    school: 'Delhi Public School',
    uploadedAt: '2025-03-01',
    likes: 156,
    views: 1200
  }
]

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Fine Arts',
    topics: [
      {
        id: 'topic-1',
        name: 'Drawing',
        resources: [
          {
            id: 'res-1',
            title: 'Basic Sketching Techniques',
            type: 'video',
            format: 'MP4',
            url: '/path/to/resource',
            likes: 123,
            views: 890,
            uploadedAt: '2025-03-01'
          }
        ]
      }
    ]
  }
]
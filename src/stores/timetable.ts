import type { StudentSchedule } from '@/types/timetable'

export const studentSchedules: StudentSchedule[] = [
  {
    id: '1',
    name: 'John Doe',
    timetable: {
      id: 't1',
      studentId: '1',
      studentName: 'John Doe',
      schedule: {
        'Monday': [
          { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 2, time: '8:45 - 9:30', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'English', teacherName: 'Ms. Emily Brown' },
          { period: 5, time: '11:30 - 12:15', subject: 'Social Studies', teacherName: 'Mr. James Wilson' },
          { period: 6, time: '12:15 - 1:00', subject: 'Physical Education', teacherName: 'Mr. Michael Davis' }
        ],
        'Tuesday': [
          { period: 1, time: '8:00 - 8:45', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 2, time: '8:45 - 9:30', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'Hindi', teacherName: 'Mrs. Priya Sharma' },
          { period: 5, time: '11:30 - 12:15', subject: 'Computer', teacherName: 'Ms. Lisa Chen' },
          { period: 6, time: '12:15 - 1:00', subject: 'Library', teacherName: 'Mrs. Rachel Green' }
        ],
        'Wednesday': [
          { period: 1, time: '8:00 - 8:45', subject: 'English', teacherName: 'Ms. Emily Brown' },
          { period: 2, time: '8:45 - 9:30', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 5, time: '11:30 - 12:15', subject: 'Art', teacherName: 'Ms. Emma White' },
          { period: 6, time: '12:15 - 1:00', subject: 'Social Studies', teacherName: 'Mr. James Wilson' }
        ],
        'Thursday': [
          { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 2, time: '8:45 - 9:30', subject: 'English', teacherName: 'Ms. Emily Brown' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 5, time: '11:30 - 12:15', subject: 'Music', teacherName: 'Mr. David Lee' },
          { period: 6, time: '12:15 - 1:00', subject: 'Physical Education', teacherName: 'Mr. Michael Davis' }
        ],
        'Friday': [
          { period: 1, time: '8:00 - 8:45', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 2, time: '8:45 - 9:30', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'English', teacherName: 'Ms. Emily Brown' },
          { period: 5, time: '11:30 - 12:15', subject: 'Social Studies', teacherName: 'Mr. James Wilson' },
          { period: 6, time: '12:15 - 1:00', subject: 'Computer', teacherName: 'Ms. Lisa Chen' }
        ],
        'Saturday': [
          { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacherName: 'Mrs. Sarah Johnson' },
          { period: 2, time: '8:45 - 9:30', subject: 'Science', teacherName: 'Mr. Robert Smith' },
          { period: 3, time: '9:45 - 10:30', subject: 'Break', teacherName: '-' },
          { period: 4, time: '10:30 - 11:15', subject: 'English', teacherName: 'Ms. Emily Brown' },
          { period: 5, time: '11:30 - 12:15', subject: 'Club Activities', teacherName: 'Various Teachers' },
          { period: 6, time: '12:15 - 1:00', subject: 'Sports', teacherName: 'Mr. Michael Davis' }
        ]
      }
    }
  }
]
export interface TeacherTimeSlot {
  period: number
  time: string
  subject: string
  teacherName: string
}

export interface TeacherTimetable {
  id: string
  studentId: string
  studentName: string
  schedule: Record<string, TeacherTimeSlot[]>
}

export interface StudentSchedule {
  id: string
  name: string
  timetable: TeacherTimetable
}
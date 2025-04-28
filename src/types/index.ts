
export type UserRole = "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  teacherId: string;
  semester: string;
  maxStudents: number;
  enrolledStudents: number;
}

export interface Schedule {
  id: string;
  courseId: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: "active" | "dropped" | "completed";
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  midterm: number | null;
  final: number | null;
  assignments: number | null;
  attendance: number | null;
  finalGrade: number | null;
  letterGrade: string | null;
}

export interface AcademicRecord {
  studentId: string;
  totalCredits: number;
  gpa: number;
  courses: {
    courseId: string;
    semester: string;
    finalGrade: number;
    letterGrade: string;
  }[];
}

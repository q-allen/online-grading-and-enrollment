
import { User, Course, Schedule, Enrollment, Grade, AcademicRecord } from "../types";

// Mock Users Data
export const users: User[] = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "sjohnson@college.edu",
    role: "teacher",
    profileImage: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "t2",
    name: "Prof. Michael Chen",
    email: "mchen@college.edu",
    role: "teacher",
    profileImage: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "s1",
    name: "Emma Wilson",
    email: "ewilson@college.edu",
    role: "student",
    profileImage: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "s2",
    name: "James Taylor",
    email: "jtaylor@college.edu",
    role: "student",
    profileImage: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "s3",
    name: "Olivia Martinez",
    email: "omartinez@college.edu",
    role: "student",
    profileImage: "https://i.pravatar.cc/150?img=5"
  }
];

// Mock Courses Data
export const courses: Course[] = [
  {
    id: "c1",
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "Fundamental concepts of programming and computer science.",
    credits: 3,
    teacherId: "t1",
    semester: "Fall 2023",
    maxStudents: 30,
    enrolledStudents: 28
  },
  {
    id: "c2",
    code: "MATH201",
    name: "Calculus I",
    description: "Introduction to differential and integral calculus.",
    credits: 4,
    teacherId: "t2",
    semester: "Fall 2023",
    maxStudents: 25,
    enrolledStudents: 22
  },
  {
    id: "c3",
    code: "ENG105",
    name: "Composition",
    description: "Principles of academic writing and rhetorical concepts.",
    credits: 3,
    teacherId: "t1",
    semester: "Fall 2023",
    maxStudents: 20,
    enrolledStudents: 18
  },
  {
    id: "c4",
    code: "BIO110",
    name: "Introduction to Biology",
    description: "Basic principles of biology including cell structure and function.",
    credits: 4,
    teacherId: "t2",
    semester: "Spring 2024",
    maxStudents: 30,
    enrolledStudents: 15
  },
  {
    id: "c5",
    code: "CS201",
    name: "Data Structures",
    description: "Advanced programming concepts and data structures.",
    credits: 3,
    teacherId: "t1",
    semester: "Spring 2024",
    maxStudents: 25,
    enrolledStudents: 10
  }
];

// Mock Schedules Data
export const schedules: Schedule[] = [
  {
    id: "sch1",
    courseId: "c1",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    room: "Tech 101"
  },
  {
    id: "sch2",
    courseId: "c1",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "10:30",
    room: "Tech 101"
  },
  {
    id: "sch3",
    courseId: "c2",
    day: "Tuesday",
    startTime: "11:00",
    endTime: "12:30",
    room: "Math 202"
  },
  {
    id: "sch4",
    courseId: "c2",
    day: "Thursday",
    startTime: "11:00",
    endTime: "12:30",
    room: "Math 202"
  },
  {
    id: "sch5",
    courseId: "c3",
    day: "Monday",
    startTime: "14:00",
    endTime: "15:30",
    room: "Arts 105"
  },
  {
    id: "sch6",
    courseId: "c4",
    day: "Tuesday",
    startTime: "13:00",
    endTime: "14:30",
    room: "Science 302"
  },
  {
    id: "sch7",
    courseId: "c5",
    day: "Wednesday",
    startTime: "15:00",
    endTime: "16:30",
    room: "Tech 205"
  }
];

// Mock Enrollments Data
export const enrollments: Enrollment[] = [
  {
    id: "e1",
    studentId: "s1",
    courseId: "c1",
    enrollmentDate: "2023-08-25",
    status: "active"
  },
  {
    id: "e2",
    studentId: "s1",
    courseId: "c2",
    enrollmentDate: "2023-08-25",
    status: "active"
  },
  {
    id: "e3",
    studentId: "s2",
    courseId: "c1",
    enrollmentDate: "2023-08-26",
    status: "active"
  },
  {
    id: "e4",
    studentId: "s3",
    courseId: "c2",
    enrollmentDate: "2023-08-26",
    status: "active"
  },
  {
    id: "e5",
    studentId: "s3",
    courseId: "c3",
    enrollmentDate: "2023-08-26",
    status: "dropped"
  },
  {
    id: "e6",
    studentId: "s2",
    courseId: "c3",
    enrollmentDate: "2023-08-27",
    status: "active"
  }
];

// Mock Grades Data
export const grades: Grade[] = [
  {
    id: "g1",
    studentId: "s1",
    courseId: "c1",
    midterm: 85,
    final: 90,
    assignments: 88,
    attendance: 95,
    finalGrade: 89.5,
    letterGrade: "A-"
  },
  {
    id: "g2",
    studentId: "s1",
    courseId: "c2",
    midterm: 78,
    final: 82,
    assignments: 80,
    attendance: 90,
    finalGrade: 81.4,
    letterGrade: "B"
  },
  {
    id: "g3",
    studentId: "s2",
    courseId: "c1",
    midterm: 92,
    final: 94,
    assignments: 90,
    attendance: 100,
    finalGrade: 93.4,
    letterGrade: "A"
  },
  {
    id: "g4",
    studentId: "s3",
    courseId: "c2",
    midterm: 65,
    final: 72,
    assignments: 70,
    attendance: 85,
    finalGrade: 71.5,
    letterGrade: "C"
  },
  {
    id: "g5",
    studentId: "s2",
    courseId: "c3",
    midterm: 88,
    final: null,
    assignments: 85,
    attendance: 90,
    finalGrade: null,
    letterGrade: null
  }
];

// Mock Academic Records
export const academicRecords: AcademicRecord[] = [
  {
    studentId: "s1",
    totalCredits: 7,
    gpa: 3.6,
    courses: [
      {
        courseId: "c1",
        semester: "Fall 2023",
        finalGrade: 89.5,
        letterGrade: "A-"
      },
      {
        courseId: "c2",
        semester: "Fall 2023",
        finalGrade: 81.4,
        letterGrade: "B"
      }
    ]
  },
  {
    studentId: "s2",
    totalCredits: 6,
    gpa: 3.85,
    courses: [
      {
        courseId: "c1",
        semester: "Fall 2023",
        finalGrade: 93.4,
        letterGrade: "A"
      },
      {
        courseId: "c3",
        semester: "Fall 2023",
        finalGrade: 86.5,
        letterGrade: "B+"
      }
    ]
  },
  {
    studentId: "s3",
    totalCredits: 4,
    gpa: 2.3,
    courses: [
      {
        courseId: "c2",
        semester: "Fall 2023",
        finalGrade: 71.5,
        letterGrade: "C"
      }
    ]
  }
];

// Helper function to get course by ID
export const getCourseById = (courseId: string): Course | undefined => {
  return courses.find(course => course.id === courseId);
};

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// Helper function to get grades for student
export const getGradesForStudent = (studentId: string): Grade[] => {
  return grades.filter(grade => grade.studentId === studentId);
};

// Helper function to get courses for teacher
export const getCoursesForTeacher = (teacherId: string): Course[] => {
  return courses.filter(course => course.teacherId === teacherId);
};

// Helper function to get enrollments for student
export const getEnrollmentsForStudent = (studentId: string): Enrollment[] => {
  return enrollments.filter(enrollment => enrollment.studentId === studentId);
};

// Helper function to get enrolled courses for student
export const getEnrolledCoursesForStudent = (studentId: string): Course[] => {
  const studentEnrollments = getEnrollmentsForStudent(studentId);
  return studentEnrollments
    .filter(enrollment => enrollment.status === "active")
    .map(enrollment => {
      const course = getCourseById(enrollment.courseId);
      return course!;
    })
    .filter(Boolean) as Course[];
};

// Helper function to get schedule for course
export const getScheduleForCourse = (courseId: string): Schedule[] => {
  return schedules.filter(schedule => schedule.courseId === courseId);
};

// Helper function to get academic record for student
export const getAcademicRecordForStudent = (studentId: string): AcademicRecord | undefined => {
  return academicRecords.find(record => record.studentId === studentId);
};

// Helper function to get students enrolled in a course
export const getStudentsInCourse = (courseId: string): User[] => {
  const courseEnrollments = enrollments.filter(
    enrollment => enrollment.courseId === courseId && enrollment.status === "active"
  );
  
  return courseEnrollments
    .map(enrollment => {
      const student = getUserById(enrollment.studentId);
      return student;
    })
    .filter(Boolean) as User[];
};

// Helper function to get student grade for a course
export const getStudentGradeForCourse = (studentId: string, courseId: string): Grade | undefined => {
  return grades.find(grade => grade.studentId === studentId && grade.courseId === courseId);
};

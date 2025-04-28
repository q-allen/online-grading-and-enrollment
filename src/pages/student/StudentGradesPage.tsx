
import React, { useState } from "react";
import { getEnrolledCoursesForStudent, getStudentGradeForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const StudentGradesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  
  if (!currentUser || currentUser.role !== "student") {
    return <div>Access Denied</div>;
  }
  
  const enrolledCourses = getEnrolledCoursesForStudent(currentUser.id);
  
  const semesters = Array.from(new Set(enrolledCourses.map(course => course.semester)));
  
  const filteredCourses = selectedSemester
    ? enrolledCourses.filter(course => course.semester === selectedSemester)
    : enrolledCourses;
  
  const renderGradeCard = (courseId: string) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (!course) return null;
    
    const grade = getStudentGradeForCourse(currentUser.id, courseId);
    
    if (!grade) {
      return (
        <Card key={course.id} className="card-shadow">
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
            <CardDescription>{course.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No grades available yet
            </div>
          </CardContent>
        </Card>
      );
    }
    
    const getProgressColor = (value: number | null) => {
      if (value === null) return "bg-gray-200";
      if (value >= 90) return "bg-green-500";
      if (value >= 80) return "bg-emerald-500";
      if (value >= 70) return "bg-yellow-500";
      if (value >= 60) return "bg-orange-500";
      return "bg-red-500";
    };
    
    return (
      <Card key={course.id} className="card-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.code}</CardDescription>
            </div>
            {grade.finalGrade !== null && (
              <div className="text-right">
                <span className="text-2xl font-bold">
                  {grade.letterGrade}
                </span>
                <p className="text-sm text-muted-foreground">
                  {grade.finalGrade}%
                </p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Midterm</span>
                <span>{grade.midterm !== null ? `${grade.midterm}%` : 'N/A'}</span>
              </div>
              <Progress value={grade.midterm || 0} className={getProgressColor(grade.midterm)} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Final</span>
                <span>{grade.final !== null ? `${grade.final}%` : 'N/A'}</span>
              </div>
              <Progress value={grade.final || 0} className={getProgressColor(grade.final)} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Assignments</span>
                <span>{grade.assignments !== null ? `${grade.assignments}%` : 'N/A'}</span>
              </div>
              <Progress value={grade.assignments || 0} className={getProgressColor(grade.assignments)} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Attendance</span>
                <span>{grade.attendance !== null ? `${grade.attendance}%` : 'N/A'}</span>
              </div>
              <Progress value={grade.attendance || 0} className={getProgressColor(grade.attendance)} />
            </div>
            
            {grade.finalGrade !== null && (
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Final Grade</span>
                    <span className="font-medium">{grade.finalGrade}%</span>
                  </div>
                  <Progress value={grade.finalGrade || 0} className={getProgressColor(grade.finalGrade)} />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-college-blue">My Grades</h1>
        
        <div className="w-full md:w-64">
          <Select onValueChange={(value) => setSelectedSemester(value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Semesters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Semesters</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredCourses.map(course => renderGradeCard(course.id))}
        </div>
      ) : (
        <Card className="card-shadow">
          <CardContent className="p-12 text-center">
            <h3 className="mt-4 text-lg font-medium">No Course Data</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You don't have any courses for the selected semester.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentGradesPage;


import React from "react";
import { BarChart, GraduationCap } from "lucide-react";
import { getAcademicRecordForStudent, getCourseById, getStudentGradeForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentRecordPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== "student") {
    return <div>Access Denied</div>;
  }
  
  const academicRecord = getAcademicRecordForStudent(currentUser.id);
  
  if (!academicRecord) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-college-blue">Academic Record</h1>
        <Card className="card-shadow">
          <CardContent className="p-12 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
            <h3 className="mt-4 text-lg font-medium">No Academic Record</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your academic record is not available yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const getLetterGradeColor = (letterGrade: string) => {
    switch (letterGrade[0]) {
      case 'A': return "text-green-600";
      case 'B': return "text-emerald-600";
      case 'C': return "text-yellow-600";
      case 'D': return "text-orange-600";
      case 'F': return "text-red-600";
      default: return "";
    }
  };
  
  // Group courses by semester for the table
  const coursesBySemester = academicRecord.courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<string, typeof academicRecord.courses>);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-college-blue">Academic Record</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-shadow md:col-span-1">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Your academic progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GPA</span>
                <span className="text-2xl font-bold">{academicRecord.gpa.toFixed(2)}</span>
              </div>
              <Progress value={academicRecord.gpa * 25} className="bg-persian-blue" />
              <p className="text-xs text-muted-foreground text-right">out of 4.0</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Credits</span>
                <Badge variant="outline" className="font-bold">
                  {academicRecord.totalCredits}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Courses Completed</span>
                <Badge variant="outline" className="font-bold">
                  {academicRecord.courses.length}
                </Badge>
              </div>
            </div>
            
            <div className="pt-4 border-t space-y-2">
              <h3 className="text-sm font-medium">Grade Distribution</h3>
              <div className="flex justify-between gap-2 text-xs">
                {['A', 'B', 'C', 'D', 'F'].map((grade) => {
                  const count = academicRecord.courses.filter(c => c.letterGrade.startsWith(grade)).length;
                  return (
                    <div 
                      key={grade} 
                      className={`flex-1 p-2 rounded-md text-center ${count > 0 ? 'bg-morning-blue text-college-blue' : 'bg-gray-100'}`}
                    >
                      <div className="font-bold">{grade}</div>
                      <div>{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow md:col-span-2">
          <CardHeader>
            <CardTitle>Course History</CardTitle>
            <CardDescription>Your completed and in-progress courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(coursesBySemester).map(([semester, courses]) => (
                    <React.Fragment key={semester}>
                      <TableRow>
                        <TableCell colSpan={3} className="bg-morning-blue">
                          <span className="font-semibold">{semester}</span>
                        </TableCell>
                      </TableRow>
                      
                      {courses.map(course => {
                        const courseDetails = getCourseById(course.courseId);
                        return (
                          <TableRow key={course.courseId}>
                            <TableCell>
                              <div className="font-medium">{courseDetails?.name}</div>
                              <div className="text-xs text-muted-foreground">{courseDetails?.code}</div>
                            </TableCell>
                            <TableCell>{courseDetails?.credits}</TableCell>
                            <TableCell className="text-right">
                              <span className={`font-bold ${getLetterGradeColor(course.letterGrade)}`}>
                                {course.letterGrade}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRecordPage;


import React, { useState } from "react";
import { Search, User, Check, Save } from "lucide-react";
import { courses, getCoursesForTeacher, getStudentsInCourse, getStudentGradeForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Course, User as UserType } from "@/types";
import { useToast } from "@/hooks/use-toast";

const TeacherGradesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [grades, setGrades] = useState<Record<string, Record<string, number | null>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  if (!currentUser || currentUser.role !== "teacher") {
    return <div>Access Denied</div>;
  }
  
  const teacherCourses = getCoursesForTeacher(currentUser.id);
  
  const handleCourseChange = (courseId: string) => {
    const course = teacherCourses.find(c => c.id === courseId) || null;
    setSelectedCourse(course);
    setGrades({});
    setHasChanges(false);
  };
  
  const getStudents = (): UserType[] => {
    if (!selectedCourse) return [];
    
    const students = getStudentsInCourse(selectedCourse.id);
    
    if (searchTerm) {
      return students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return students;
  };
  
  const handleGradeChange = (studentId: string, field: string, value: string) => {
    const numValue = value === "" ? null : Number(value);
    
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: numValue
      }
    }));
    
    setHasChanges(true);
  };
  
  const handleSaveGrades = () => {
    // In a real app, you'd send these changes to an API
    toast({
      title: "Grades saved",
      description: "Student grades have been successfully updated.",
    });
    setHasChanges(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-college-blue">Manage Student Grades</h1>
        
        {hasChanges && (
          <Button onClick={handleSaveGrades} className="primary-btn">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        )}
      </div>
      
      <Card className="card-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Select Course</label>
              <Select onValueChange={handleCourseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {teacherCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedCourse && (
              <div className="md:w-2/3">
                <label className="text-sm font-medium mb-1 block">Search Students</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          
          {selectedCourse ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Student</TableHead>
                      <TableHead className="text-center">Midterm</TableHead>
                      <TableHead className="text-center">Final</TableHead>
                      <TableHead className="text-center">Assignments</TableHead>
                      <TableHead className="text-center">Attendance</TableHead>
                      <TableHead className="text-center">Final Grade</TableHead>
                      <TableHead className="text-center">Letter Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getStudents().map((student) => {
                      const studentGrade = getStudentGradeForCourse(student.id, selectedCourse.id);
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="bg-college-blue text-white p-1 rounded-full">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <div>{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className="w-16 mx-auto text-center"
                              defaultValue={studentGrade?.midterm ?? ""}
                              onChange={(e) => handleGradeChange(student.id, "midterm", e.target.value)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className="w-16 mx-auto text-center"
                              defaultValue={studentGrade?.final ?? ""}
                              onChange={(e) => handleGradeChange(student.id, "final", e.target.value)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className="w-16 mx-auto text-center"
                              defaultValue={studentGrade?.assignments ?? ""}
                              onChange={(e) => handleGradeChange(student.id, "assignments", e.target.value)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className="w-16 mx-auto text-center"
                              defaultValue={studentGrade?.attendance ?? ""}
                              onChange={(e) => handleGradeChange(student.id, "attendance", e.target.value)}
                            />
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {studentGrade?.finalGrade !== null ? studentGrade?.finalGrade : "-"}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {studentGrade?.letterGrade || "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {getStudents().length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No students found for this course
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {getStudents().length > 0 && hasChanges && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSaveGrades} className="primary-btn">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <User className="mx-auto h-12 w-12 opacity-20 mb-2" />
              <h3 className="font-medium text-lg">No Course Selected</h3>
              <p className="text-sm mt-1">Please select a course to manage student grades</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherGradesPage;

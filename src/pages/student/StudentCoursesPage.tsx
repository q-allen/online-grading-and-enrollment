
import React, { useState } from "react";
import { Search, Clock, Calendar, Book, Plus, Check } from "lucide-react";
import { courses, enrollments, getEnrolledCoursesForStudent, getScheduleForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course } from "@/types";
import { useToast } from "@/hooks/use-toast";

const StudentCoursesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  
  if (!currentUser || currentUser.role !== "student") {
    return <div>Access Denied</div>;
  }
  
  // Get courses student is already enrolled in
  const enrolledCourseIds = enrollments
    .filter(e => e.studentId === currentUser.id && e.status === "active")
    .map(e => e.courseId);
  
  // Filter available courses (not enrolled)
  const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course.id));
  
  const filteredCourses = searchTerm
    ? availableCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableCourses;
    
  const handleEnroll = (course: Course) => {
    setEnrolling(true);
    
    // In a real app, you'd call an API to handle enrollment
    setTimeout(() => {
      toast({
        title: "Successfully enrolled",
        description: `You've been enrolled in ${course.code} - ${course.name}.`,
      });
      setEnrolling(false);
      setSelectedCourse(null);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-college-blue">Available Courses</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4 bg-white p-4 rounded-lg card-shadow">
            <h2 className="font-medium text-lg text-college-blue">Available Courses ({filteredCourses.length})</h2>
            {filteredCourses.length > 0 ? (
              <div className="space-y-2">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`border cursor-pointer transition-colors ${
                      selectedCourse?.id === course.id
                        ? "border-persian-blue bg-morning-blue"
                        : "hover:border-picton-blue"
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <CardContent className="p-4">
                      <div>
                        <h3 className="font-medium">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {course.credits} Credits
                          </Badge>
                          <Badge variant="outline" className="bg-morning-blue">
                            {course.semester}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No courses available for enrollment
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedCourse ? (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-persian-blue">{selectedCourse.code} - {selectedCourse.name}</CardTitle>
                <CardDescription>
                  {selectedCourse.credits} credits · {selectedCourse.semester} · {selectedCourse.enrolledStudents}/{selectedCourse.maxStudents} enrolled
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">
                      <Book className="mr-2 h-4 w-4" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="schedule">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                      <p className="mt-1">{selectedCourse.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Credits</h3>
                        <p className="mt-1">{selectedCourse.credits}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Semester</h3>
                        <p className="mt-1">{selectedCourse.semester}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Available Seats</h3>
                        <p className="mt-1">{selectedCourse.maxStudents - selectedCourse.enrolledStudents}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Enrollment Status</h3>
                        <p className="mt-1">
                          {selectedCourse.enrolledStudents >= selectedCourse.maxStudents ? (
                            <Badge variant="destructive">Full</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Open
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="pt-4">
                    <div className="space-y-3">
                      {getScheduleForCourse(selectedCourse.id).length > 0 ? (
                        getScheduleForCourse(selectedCourse.id).map((schedule) => (
                          <Card key={schedule.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="bg-persian-blue/10 text-persian-blue p-2 rounded-md mr-4">
                                    <Clock className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{schedule.day}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {schedule.startTime} - {schedule.endTime}
                                    </p>
                                  </div>
                                </div>
                                <Badge>{schedule.room}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center p-4 text-muted-foreground">
                          No schedule found for this course
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full highlight-btn flex items-center" 
                  onClick={() => handleEnroll(selectedCourse)}
                  disabled={enrolling || selectedCourse.enrolledStudents >= selectedCourse.maxStudents}
                >
                  {enrolling ? (
                    "Enrolling..."
                  ) : selectedCourse.enrolledStudents >= selectedCourse.maxStudents ? (
                    "Course is Full"
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Enroll in this Course
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-white rounded-lg card-shadow">
              <div className="text-center">
                <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Course Selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a course from the list to view details and enroll
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCoursesPage;

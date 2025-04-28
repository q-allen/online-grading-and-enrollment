
import React from "react";
import { Book, Calendar, Clock, X } from "lucide-react";
import { getEnrolledCoursesForStudent, getScheduleForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const StudentEnrolledPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  if (!currentUser || currentUser.role !== "student") {
    return <div>Access Denied</div>;
  }
  
  const enrolledCourses = getEnrolledCoursesForStudent(currentUser.id);
  
  const handleDropCourse = (courseId: string, courseName: string) => {
    // In a real app, you'd call an API to handle dropping a course
    toast({
      title: "Course dropped",
      description: `You have dropped ${courseName}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-college-blue">My Enrolled Courses</h1>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="card-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-persian-blue">{course.code}</CardTitle>
                <CardDescription>{course.name}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs text-muted-foreground">Credits</h3>
                        <p className="font-medium">{course.credits}</p>
                      </div>
                      <div>
                        <h3 className="text-xs text-muted-foreground">Semester</h3>
                        <p className="font-medium">{course.semester}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs text-muted-foreground">Description</h3>
                      <p className="text-sm">{course.description}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="pt-4">
                    <div className="space-y-2">
                      {getScheduleForCourse(course.id).map((schedule) => (
                        <div 
                          key={schedule.id} 
                          className="flex items-center justify-between bg-gray-50 rounded-md p-2"
                        >
                          <div>
                            <p className="font-medium">{schedule.day}</p>
                            <p className="text-xs text-muted-foreground">
                              {schedule.startTime} - {schedule.endTime}
                            </p>
                          </div>
                          <Badge className="bg-morning-blue text-college-blue hover:bg-morning-blue">
                            {schedule.room}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center justify-center" 
                  onClick={() => handleDropCourse(course.id, course.name)}
                >
                  <X className="mr-2 h-4 w-4" /> Drop Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-shadow">
          <CardContent className="p-12 text-center">
            <Book className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
            <h3 className="mt-4 text-lg font-medium">No Enrolled Courses</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't enrolled in any courses yet.
            </p>
            <Button 
              className="mt-6 primary-btn"
              onClick={() => window.location.href = '/student/courses'}
            >
              Browse Available Courses
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentEnrolledPage;

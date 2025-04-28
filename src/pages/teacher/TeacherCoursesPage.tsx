
import React, { useState } from "react";
import { Book, CalendarDays, Edit, Trash, Plus, Search } from "lucide-react";
import { courses, getCoursesForTeacher, schedules, getScheduleForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Schedule } from "@/types";
import { useToast } from "@/hooks/use-toast";

const TeacherCoursesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  
  if (!currentUser || currentUser.role !== "teacher") {
    return <div>Access Denied</div>;
  }
  
  const teacherCourses = getCoursesForTeacher(currentUser.id);
  
  const filteredCourses = searchTerm
    ? teacherCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teacherCourses;
    
  const getScheduleForActiveCourse = () => {
    if (!activeCourse) return [];
    return getScheduleForCourse(activeCourse.id);
  };
  
  const handleDeleteCourse = (courseId: string) => {
    // In a real app, you'd call an API to delete the course
    toast({
      title: "Course deleted",
      description: "The course has been successfully deleted.",
    });
  };
  
  const handleEditCourse = (course: Course) => {
    setActiveCourse(course);
    setIsEditingCourse(true);
  };
  
  const handleAddCourse = () => {
    setIsAddingCourse(true);
    setActiveCourse(null);
  };
  
  const handleSaveCourse = () => {
    if (isEditingCourse) {
      toast({
        title: "Course updated",
        description: "The course has been successfully updated.",
      });
      setIsEditingCourse(false);
    } else {
      toast({
        title: "Course added",
        description: "The new course has been successfully added.",
      });
      setIsAddingCourse(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-college-blue">My Courses</h1>
        <Button onClick={handleAddCourse} className="primary-btn">
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>
      
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
            <h2 className="font-medium text-lg text-college-blue">Your Courses ({filteredCourses.length})</h2>
            {filteredCourses.length > 0 ? (
              <div className="space-y-2">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`border cursor-pointer transition-colors ${
                      activeCourse?.id === course.id
                        ? "border-persian-blue bg-morning-blue"
                        : "hover:border-picton-blue"
                    }`}
                    onClick={() => setActiveCourse(course)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.code}</p>
                          <Badge variant="outline" className="mt-2">
                            {course.enrolledStudents}/{course.maxStudents} students
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCourse(course);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(course.id);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No courses found
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {(activeCourse || isAddingCourse) ? (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>
                  {isAddingCourse ? "Add New Course" : isEditingCourse ? "Edit Course" : "Course Details"}
                </CardTitle>
                <CardDescription>
                  {isAddingCourse
                    ? "Create a new course for your teaching schedule"
                    : isEditingCourse
                    ? "Update the course information"
                    : "View and manage this course's details"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {(isAddingCourse || isEditingCourse) ? (
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Course Code</label>
                        <Input placeholder="e.g., CS101" defaultValue={activeCourse?.code} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Course Name</label>
                        <Input placeholder="e.g., Introduction to Computer Science" defaultValue={activeCourse?.name} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input placeholder="Course description" defaultValue={activeCourse?.description} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Credits</label>
                        <Input type="number" placeholder="3" defaultValue={activeCourse?.credits} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Semester</label>
                        <Input placeholder="Fall 2023" defaultValue={activeCourse?.semester} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Maximum Students</label>
                        <Input type="number" placeholder="30" defaultValue={activeCourse?.maxStudents} />
                      </div>
                    </div>
                  </form>
                ) : (
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">
                        <Book className="mr-2 h-4 w-4" />
                        Details
                      </TabsTrigger>
                      <TabsTrigger value="schedule">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Schedule
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Course Code</h3>
                          <p className="mt-1">{activeCourse?.code}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Credits</h3>
                          <p className="mt-1">{activeCourse?.credits}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Semester</h3>
                          <p className="mt-1">{activeCourse?.semester}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Enrollment</h3>
                          <p className="mt-1">{activeCourse?.enrolledStudents}/{activeCourse?.maxStudents}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="mt-1">{activeCourse?.description}</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="schedule" className="pt-4">
                      <div className="space-y-4">
                        {getScheduleForActiveCourse().length > 0 ? (
                          <div className="space-y-3">
                            {getScheduleForActiveCourse().map((schedule) => (
                              <Card key={schedule.id} className="border">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h3 className="font-medium">{schedule.day}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {schedule.startTime} - {schedule.endTime}
                                      </p>
                                    </div>
                                    <Badge>{schedule.room}</Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 text-muted-foreground">
                            No schedule found for this course
                          </div>
                        )}
                        
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" /> Add Class Schedule
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditingCourse(false);
                    setIsAddingCourse(false);
                  }}
                >
                  Cancel
                </Button>
                {(isAddingCourse || isEditingCourse) && (
                  <Button 
                    className="primary-btn" 
                    onClick={handleSaveCourse}
                  >
                    {isAddingCourse ? "Add Course" : "Save Changes"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-white rounded-lg card-shadow">
              <div className="text-center">
                <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Course Selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a course from the list or add a new one
                </p>
                <Button 
                  className="mt-4 primary-btn" 
                  onClick={handleAddCourse}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Course
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursesPage;

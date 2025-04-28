
import React, { useState } from "react";
import { Calendar, Clock, Edit, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { courses, getCoursesForTeacher, schedules, getScheduleForCourse } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course, Schedule } from "@/types";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TeacherSchedulesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentWeek, setCurrentWeek] = useState<string>("Current Week");
  
  if (!currentUser || currentUser.role !== "teacher") {
    return <div>Access Denied</div>;
  }
  
  const teacherCourses = getCoursesForTeacher(currentUser.id);
  
  // Get all schedules for the teacher's courses
  const teacherSchedules = teacherCourses.flatMap(course => {
    const courseSchedules = getScheduleForCourse(course.id);
    return courseSchedules.map(schedule => ({
      ...schedule,
      course: course
    }));
  });
  
  // Create a structured schedule by days
  const scheduleByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = teacherSchedules.filter(s => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, (Schedule & { course: Course })[]>);

  const handlePreviousWeek = () => {
    setCurrentWeek("Previous Week");
  };

  const handleNextWeek = () => {
    setCurrentWeek("Next Week");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-college-blue">Class Schedules</h1>
        
        <div className="flex items-center space-x-2 bg-white rounded-md p-1 card-shadow">
          <Button variant="ghost" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center px-2">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">{currentWeek}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        {daysOfWeek.map((day) => (
          <Card key={day} className="card-shadow">
            <CardContent className="p-0">
              <div className="border-b bg-college-blue text-white py-3 px-6 rounded-t-lg">
                <h2 className="text-lg font-semibold">{day}</h2>
              </div>
              
              <div className="py-2 px-4">
                {scheduleByDay[day].length > 0 ? (
                  <div className="divide-y">
                    {scheduleByDay[day].map((schedule) => (
                      <div
                        key={schedule.id}
                        className="py-3 px-2 flex flex-col md:flex-row md:items-center justify-between"
                      >
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="bg-persian-blue/10 text-persian-blue p-2 rounded-md mr-4">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{schedule.course.name}</p>
                            <p className="text-sm text-muted-foreground">{schedule.course.code}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                          <Badge variant="outline" className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {schedule.startTime} - {schedule.endTime}
                          </Badge>
                          
                          <Badge className="bg-morning-blue text-college-blue hover:bg-morning-blue">
                            {schedule.room}
                          </Badge>
                          
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No classes scheduled for this day
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherSchedulesPage;

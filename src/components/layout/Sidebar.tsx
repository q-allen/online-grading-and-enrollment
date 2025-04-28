
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CalendarDays, 
  BookOpen, 
  GraduationCap, 
  ListChecks, 
  Clock, 
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;

  const teacherLinks = [
    { path: "/teacher/courses", label: "Manage Courses", icon: <BookOpen size={20} /> },
    { path: "/teacher/schedules", label: "Class Schedules", icon: <Clock size={20} /> },
    { path: "/teacher/students", label: "Manage Grades", icon: <ListChecks size={20} /> },
  ];

  const studentLinks = [
    { path: "/student/courses", label: "Available Courses", icon: <BookOpen size={20} /> },
    { path: "/student/enrolled", label: "Enrolled Courses", icon: <GraduationCap size={20} /> },
    { path: "/student/grades", label: "My Grades", icon: <ListChecks size={20} /> },
    { path: "/student/record", label: "Academic Record", icon: <CalendarDays size={20} /> },
  ];

  const links = currentUser.role === "teacher" ? teacherLinks : studentLinks;

  return (
    <aside
      className={cn(
        "bg-college-blue text-white flex flex-col transition-all duration-300 z-10",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-persian-blue">
        <div className="flex items-center space-x-2 overflow-hidden">
          <GraduationCap size={24} />
          {isOpen && <span className="font-semibold">Campus System</span>}
        </div>
        <Button 
          onClick={toggleSidebar} 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-persian-blue"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 pt-4">
        <div className="px-3 mb-4">
          {isOpen ? (
            <p className="text-xs uppercase font-semibold opacity-70 px-3 mb-2">
              {currentUser.role === "teacher" ? "Teaching" : "Learning"}
            </p>
          ) : null}
          
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    location.pathname === link.path
                      ? "bg-persian-blue text-white" 
                      : "text-gray-200 hover:bg-persian-blue/50",
                    !isOpen && "justify-center"
                  )}
                >
                  {link.icon}
                  {isOpen && <span className="ml-3">{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-persian-blue">
        <div className={cn("flex items-center", !isOpen && "justify-center")}>
          <Users size={20} />
          {isOpen && <span className="ml-3 text-sm">v1.0.0</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

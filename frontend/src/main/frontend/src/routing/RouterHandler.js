import { Route, Routes } from 'react-router-dom';
import App from '../App';
import CreateCoursePage from '../pages/TeacherPages/CreateCoursePage';
import ProfessorCoursePage from '../pages/TeacherPages/ProfessorCoursePage';
import StudentCoursePage from '../pages/StudentPages/StudentCoursePage';
import CreateAssignmentPage from '../pages/TeacherPages/CreateAssignmentPage';
import StudentAssignmentPage from '../pages/StudentPages/StudentAssignmentPage';
import UnauthedErrorPage from '../pages/AuthPages/UnauthedErrorPage';
import React from 'react';
import RoleRouteHandler from './RoleRouteHandler';
import AuthRouteHandler from './AuthRouteHandler';
import ProfessorAssignmentPage from '../pages/TeacherPages/ProfessorAssignmentPage';
import StudentSubmittedAssignmentPage from '../pages/StudentPages/StudentSubmittedAssignmentPage';
import ProfessorSubmittedAssignmentPage from '../pages/TeacherPages/ProfessorSubmittedAssignmentPage';
import AdminInterface from '../pages/AdminPages/AdminInterface'
import ProfessorGradesPage from '../pages/TeacherPages/ProfessorGradesPage';
import ProfessorRosterComponent from "../components/ProfessorComponents/CoursesPage/ProfessorRosterComponent";

const RouterHandler = () => {
  return (
    <Routes>
      <Route>
        {/*public routes*/}
        <Route path='unauthenticated' element={<UnauthedErrorPage />} />
        <Route path='*' element={<p> Page doesn't exist </p>} />

        <Route element={<AuthRouteHandler />}>
          <Route path='/' element={<App />} />

          {/*professor-only routes*/}
          <Route element={<RoleRouteHandler allowedRoles={['professor']} />}>
            <Route path='create' element={<CreateCoursePage />} />
            <Route
              path='professor/:courseId'
              element={<ProfessorCoursePage />}
            />
            <Route
              path='professor/:courseId/grades'
              element={<ProfessorGradesPage />}
            />
            <Route
              path='professor/:courseId/assignments/create/assignment'
              element={<CreateAssignmentPage />}
            />
            <Route
              path='professor/:courseId/:assignmentId'
              element={<ProfessorAssignmentPage />}
            />
            <Route
              path='professor/:courseId/:assignmentId/:teamId/submitted'
              element={<ProfessorSubmittedAssignmentPage />}
            />
            <Route
              path='professor/admin'
              element={<AdminInterface />}
            />
            <Route
                path='professor'
                element={<App />}
            />
            <Route
                path='/professor/:courseID/teams'
                element={<ProfessorCoursePage chosen="Teams" />}
            />
            <Route
                path='/professor/:courseID/roster'
                element={<ProfessorCoursePage chosen="Roster" />}
            />
            <Route
                path='/professor/:courseID/assignments'
                element={<ProfessorCoursePage chosen="Assignments" />}
            />
            <Route
                path='/professor/:courseID/details'
                element={<ProfessorCoursePage chosen="Manage" />}
            />
          </Route>

          {/*student routes*/}
          <Route
            element={
              <RoleRouteHandler allowedRoles={['student', 'professor']} />
            }
          >
            <Route
              path='student/:courseId'
              element={<StudentCoursePage />}
            />
            <Route
              path='student/:courseId/:assignmentId/:assignmentType'
              element={<StudentAssignmentPage />}
            />
            <Route
              path='student/:courseId/:assignmentId/:assignmentType/:teamId'
              element={<StudentAssignmentPage />}
            />
            <Route
              path='student/:courseId/:assignmentId/:teamId/submitted'
              element={<StudentSubmittedAssignmentPage />}
            />
            <Route
                path='student/:courseId/grades'
                element={<StudentGradesPage />}
            />
            <Route
                path='student'
                element={<App />}
            />
            <Route
                path='/student/:courseID/teams'
                element={<StudentCoursePage chosen="My Team" />}
            />
            <Route
                path='/student/:courseID/assignments'
                element={<StudentCoursePage chosen="To Do" />}
            />


          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterHandler;

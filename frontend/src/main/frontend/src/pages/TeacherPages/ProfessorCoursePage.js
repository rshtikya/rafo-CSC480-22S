import { useEffect, useState } from "react";
import "./styles/ProfessorCourseStyle.css";
import SidebarComponent from "../../components/SidebarComponent";
import ProfessorRosterComponent from "../../components/ProfessorComponents/CoursesPage/ProfessorRosterComponent";
import { useParams } from "react-router-dom";
import ProfessorEditCourseComponent from "../../components/ProfessorComponents/CoursesPage/ProfessorEditCourseComponent";
import ProfessorAssignmentComponent from "../../components/ProfessorComponents/CoursesPage/ProfessorAssignmentComponent";
import { useDispatch } from "react-redux";
import { getCourseDetailsAsync } from "../../redux/features/courseSlice";
import CourseBarComponent from "../../components/CourseBarComponent";
import ProfessorTeamComponent from "../../components/ProfessorComponents/CoursesPage/ProfessorTeamComponent";
import Loader from "../../components/LoaderComponenets/Loader";
import uuid from "react-uuid";
import NavigationContainerComponent from "../../components/NavigationComponents/NavigationContainerComponent";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { useLocation } from "react-router-dom";
const CourseComponent = ({ active, component, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={
        active
          ? "inter-28-bold pcp-component-link-clicked"
          : "inter-28-light pcp-component-link"
      }
    >
      {component}
    </p>
  );
};


function ProfessorCoursePage({chosen}) {
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  let { courseId } = useParams();


  const components = ["Assignments", "Roster", "Teams", "Manage"];
  const [chosenComponent, setChosenComponent] = useState(chosen);


  useEffect(() => {
    setIsLoading(true);
    dispatch(getCourseDetailsAsync(courseId));
    setTimeout(() => setIsLoading(false), 200);
  }, [dispatch, courseId]);

  useEffect(() => {
    setChosenComponent(chosen);
  }, [chosen]);

  return (
    <div>
      <HeaderBar/>
      {isLoading ? (
        <Loader />
      ) : (
          <div className="page-container">

            <div className="pcp-container">
              <NavigationContainerComponent/>
              <div className="pcp-components">
                <div className="pcp-component-links inter-28-light">
                  {components.map(
                      (t) =>
                          t && (
                              <CourseComponent
                                  key={uuid()}
                                  component={t}
                                  active={t === chosenComponent}
                                  onClick={() => setChosenComponent(t)}
                              />
                          )
                  )}
                </div>
                <div>
                  {chosenComponent === "Assignments" && <ProfessorAssignmentComponent />}
                  {chosenComponent === "Roster" && <ProfessorRosterComponent />}
                  {chosenComponent === "Teams" && <ProfessorTeamComponent />}
                  {chosenComponent === "Manage" && <ProfessorEditCourseComponent />}
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default ProfessorCoursePage;

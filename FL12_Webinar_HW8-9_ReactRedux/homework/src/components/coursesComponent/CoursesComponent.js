import React from 'react';

import '../../css/CoursesComponent/CoursesComponent.css';
import Panel from './Panel';
import CoursesList from './CoursesList';

function CoursesComponent({ courses }) {
  
  return (
    <div className="courses">
      <Panel />
      <CoursesList courses={courses} />
    </div>
  )
}

export default CoursesComponent;
import React from 'react';
import { Link } from "react-router-dom";

import Context from '../../context';

export default function CourseItem({ course }) {
  const context = React.useContext(Context);

  return (
    <li className="course-item">
      <div className="course-date"><span>{course.date}</span></div>
      <div className="course-name"><span>{course.title}</span></div>
      <div className="course-description"><span>{course.description}</span></div>
      <div className="course-duration"><span>{course.duration}</span></div>
      <div className="course-more">
        <button onClick={(e) => showActions(e)}></button>
        <div className="action hide">
          <ul id={course.id}>
            <Link to={`/form/${course.id}`}><li>Edit</li></Link>
            <li onClick={(e) => context.deleteCourse(e)}>Delete</li>
          </ul>
        </div>
      </div>
    </li>
  )
}

function showActions(e) {
  e.target.nextSibling.classList.toggle('hide');
}
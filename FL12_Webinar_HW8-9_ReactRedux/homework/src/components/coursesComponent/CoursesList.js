import React from 'react';

import CourseItem from './CourseItem';

export default function CoursesList({ courses }) {
  return (
    <div className="courses-list">
      <ul>
        {courses.map(course => {
          return <CourseItem course={course} key={Math.random().toFixed(6)} />
        })}
      </ul>
    </div>
  )
}
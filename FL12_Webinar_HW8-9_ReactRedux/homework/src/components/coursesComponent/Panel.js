import React from 'react';
import { Link } from "react-router-dom";

export default function Panel() {

  return (
    <div className="courses-panel">
      <input onInput={doSearch} type="search" className="courses-search" placeholder="Search by title..."/>
      <Link to="/form/new"><button className="courses-add">Add course</button></Link>
    </div>
  )

  function doSearch(e) {
    const strToSearch = e.target.value;
    const courses = Array.from(document.getElementsByClassName('course-name'));
    if (strToSearch) {
      courses.forEach(course => {
        if (course.innerText.toLocaleLowerCase().indexOf(strToSearch.toLocaleLowerCase()) !== -1) {
          course.parentElement.style.display = 'flex';
        } else {
          course.parentElement.style.display = 'none';
        }
      })
    } else {
      courses.forEach(course => {
        course.parentElement.style.display = 'flex';
      })
    }
  }
}
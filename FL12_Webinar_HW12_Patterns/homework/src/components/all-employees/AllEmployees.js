import React from 'react';

import './AllEmployees.css';

export default function AllEmployees({ topRM }) {

  function createNodes(topRM) {
    return topRM.employees.map(employee => {
      if (!employee.hasEmployees()) {
        return (
          <li className="developer" key={employee.id}>
            <span className="show-details" onClick={(e) => toggleDetails(e.target)}>{employee.name}</span>
            <ul className="employee-details">
              <li>performance: {employee.performance}</li>
              <li>last vacation date: {employee['last_vacation_date']}</li>
              <li>salary: {employee.salary}</li>
            </ul>
          </li>
        );
      } else {
        return (
          <li className="resource-manager" key={employee.id}>
            <span onClick={(e) => toggleDetails(e.target)}>{employee.name}</span>
            <ul className="employee-details">
              <li>performance: {employee.performance}</li>
              <li>last vacation date: {employee['last_vacation_date']}</li>
              <li>salary: {employee.salary}</li>
            </ul>
            <ul>
              {createNodes(employee)}
            </ul>
          </li>
        );
      }
    });
  }

  function toggleDetails(target) {
    target.nextSibling.classList.toggle('show');
  }

  return (
    <ul className="employees-list">
      {topRM && createNodes({ employees: [topRM] })}
    </ul>
  );
}
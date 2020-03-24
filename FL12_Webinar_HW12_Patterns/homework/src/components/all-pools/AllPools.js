import React from 'react';

import './AllPools.css';

export default function AllPools({ topRM }) {

  function createNodes(topRM) {
    return topRM.employees.map(employee => {
      if (employee['pool_name']) {
        return (
          <React.Fragment key={employee.id}>
            <li className="pool">
              <span className="pool-name">{employee['pool_name']}:</span>
              <ul className="pool-details">
                <li>Number of employees: {employee.employees.length}</li>
                <li>Average salary: {getAveragePoolSalary(employee.employees)}</li>
                <li>Average performance: {getAveragePoolPerformance(employee.employees)}</li>
                <li className="show-employee-li" onClick={(e) => showEmployeesList(e.currentTarget)}>
                  <span>Show pool employees:</span>
                </li>
              </ul>
              <ul className="pool-employees">
                {employee.employees.map(employee => {
                  return (
                    <li key={employee.id}>{employee.name}</li>
                  );
                })}
              </ul>
            </li>
            {createNodes(employee)}
          </ React.Fragment>
        );
      } else return null;
    });
  }

  function getAveragePoolSalary(employees) {
    let total = employees.reduce((total, employee) => total + employee.salary, 0);
    return (total / employees.length).toFixed(2);
  }

  function getAveragePoolPerformance(employees) {
    const stat = {
      1: 'low',
      2: 'average',
      3: 'top'
    };
    let total = 0;
    employees.forEach(employee => {
      if (employee.performance === 'low') {
        total += 1;
      } else if (employee.performance === 'average') {
        total += 2;
      } else {
        total += 3;
      }
    });
    return stat[Math.round(total / employees.length)];
  }

  function showEmployeesList(target) {
    target.parentElement.nextSibling.classList.toggle('show');
  }

  return (
    <ul className="pools-list">
      {topRM && createNodes({ employees: [topRM] })}
    </ul>
  );
}
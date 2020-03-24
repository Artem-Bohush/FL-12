import React from 'react';
import { SelectEmployees, DeservePunishment, DeservePromotion } from '../../SelectEmployees';

import './WarningEmployees.css';

export default function ({ topRM }) {

  function createWarningList(listType) {
    const filter = new SelectEmployees();

    if (listType === 'punishment') {
      filter.setStrategy(new DeservePunishment());
    } else {
      filter.setStrategy(new DeservePromotion());
    }

    const warningEmployees = filter.selectEmployees({ employees: [topRM] });
    
    return warningEmployees.map(employee => {
      return (
        <React.Fragment key={employee.id}>
          <li className="employee-name"
            onClick={(e) => toggleDetails(e.target)}>{employee.name}</li>
          <ul className="employee-details">
            <li>Performance: {employee.performance}</li>
            <li>Salary: {employee.salary}</li>
          </ul>
        </React.Fragment>
      );
    });
  }

  function toggleDetails(target) {
    target.nextSibling.classList.toggle('show');
  }

  return (
    <div className="warning-list">
      <ul className="punishment-list">
        <li className="list-title bad">Deserve punishment</li>
        {topRM && createWarningList('punishment')}
      </ul>
      <ul className="promotion-list">
        <li className="list-title good">Deserve promotion</li>
        {topRM && createWarningList('promotion')}
      </ul>
    </div>
  );
}
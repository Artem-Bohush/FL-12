import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import HomePage from '../components/home-page/HomePage';
import AllEmployees from '../components/all-employees/AllEmployees';
import AllPools from '../components/all-pools/AllPools';
import WarningEmployees from '../components/warning-employees/WarningEmployees';
import Employee from '../Employee';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topRM: null
    };
  }

  render() {
    return (
      <Router>
        <nav>
          <div className="container">
            <ul className="menu">
              <li>
                <Link to="/all-employees"
                  onClick={(e) => this.markActiveTab(e.target)}>All employees</Link>
              </li>
              <li>
                <Link to="/all-pools"
                  onClick={(e) => this.markActiveTab(e.target)}>All pools</Link>
              </li>
              <li>
                <Link to="/warning-employees"
                  onClick={(e) => this.markActiveTab(e.target)}>Warning employees</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route
              path='/all-employees'
              render={() => <AllEmployees topRM={this.state.topRM} />}
            />
            <Route
              path='/all-pools'
              render={() => <AllPools topRM={this.state.topRM} />}
            />
            <Route
              path='/warning-employees'
              render={() => <WarningEmployees topRM={this.state.topRM} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }

  componentDidMount() {
    fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json')
      .then(response => response.json())
      .then(employeesData => {
        const employees = [];
        let topRM = null;

        employeesData.forEach(employee => {
          employees.push(new Employee(employee));
        });

        for (let i = 0; i < employees.length; i++) {
          for (let j = 0; j < employees.length; j++) {
            if (employees[j]['rm_id'] === employees[i]['id']) {
              employees[i].add(employees[j]);
            }
          }
          if (employees[i]['rm_id'] === null) {
            topRM = employees[i];
          }
        }

        this.setState({ topRM });
      })
      .catch(err => console.log(err));
  }

  markActiveTab(link) {
    const tabs = Array.from(document.querySelector('.menu').getElementsByTagName('li'));
    tabs.forEach(tab => {
      tab.classList.remove('active-tab');
    });
    link.parentElement.classList.add('active-tab');
  }
}

export default App;
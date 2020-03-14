import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import CoursesComponent from '../components/coursesComponent/CoursesComponent';
import FormComponent from '../components/Form';
import Context from '../context';

import deleteCourseAction from '../actions/deleteCourse';
import addCourseAction from '../actions/addCourse';
import editCourseAction from '../actions/editCourse';

import '../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  render() {
    return (
      <div className="container" >
        <Router>
          <Switch>
            <Context.Provider value={{
              deleteCourse: this.deleteCourse
            }}>
              <Route
                exact path='/'
                render={() => <CoursesComponent courses={this.props.courses} />} />
              <Route
                path='/form/:id'
                render={() => <FormComponent courses={this.props.courses}
                  addCourse={this.props.addCourse} editCourse={this.props.editCourse} />} />
            </Context.Provider>
          </Switch>
        </Router>
      </div>
    )
  }

  deleteCourse(e) {
    const courseId = Number(e.target.parentElement.id);
    return this.props.deleteCourseAction(courseId);
  }
}

function mapStateToProps(state) {
  return {
    courses: state.stateInfo.courses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCourseAction: courseId => {
      dispatch(deleteCourseAction(courseId))
    },
    addCourse: courseData => {
      dispatch(addCourseAction(courseData))
    },
    editCourse: courseData => {
      dispatch(editCourseAction(courseData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

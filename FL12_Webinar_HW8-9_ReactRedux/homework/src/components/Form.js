import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import '../css/Form.css';

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Number(this.props.match.params.id),
      courseToEdit: this.props.courses.find(course => course.id === Number(this.props.match.params.id))
    };
  }

  render() {
    return (
      <>
        <div className="bg">
          <form className="form" id="form" onSubmit={(e) => this.addOrEditCourse(e)}>
            <h2>{isNaN(this.state.id) ? 'New course' : 'Edit course'}</h2>

            <label htmlFor="title">Title*</label>
            <input type="text" id="title" name="title"
              defaultValue={this.state.courseToEdit ? this.state.courseToEdit.title : ''} />

            <label htmlFor="description">Description*</label>
            <textarea id="description" name="description"
              defaultValue={this.state.courseToEdit ? this.state.courseToEdit.description : ''}>
            </textarea>

            <div className="bottom-group">
              <div>
                <label htmlFor="duration">Duration*</label>
                <input type="text" id="duration" name="duration"
                  defaultValue={this.state.courseToEdit ? this.state.courseToEdit.duration : ''} />

                <label htmlFor="authors">Authors*</label>
                <input type="text" id="authors" name="authors"
                  defaultValue={this.state.courseToEdit ? this.state.courseToEdit.authors : ''} />
              </div>
              <div>
                <label htmlFor="date">Date*</label>
                <input type="date" id="date" name="date"
                  defaultValue={this.state.courseToEdit ? this.state.courseToEdit.inputDate : ''} />
              </div>
            </div>

            <div className="form-btns">
              <button className="submit-btn disabled" type="submit" disabled>Save</button>
              <Link to="/"><button className="cancel-btn" type="reset">Cancel</button></Link>
            </div>
          </form>
        </div>
      </>
    )
  }


  addOrEditCourse(e) {
    e.preventDefault();

    const form = document.getElementById('form');
    const formData = new FormData(form);
    const courseData = {};
    formData.forEach(function (value, key) {
      courseData[key] = value;
    });

    const dateValue = document.getElementById('date').value;
    courseData.date = new Date(dateValue).toLocaleDateString();

    if (isNaN(this.state.id)) {
      this.props.addCourse(courseData);
    } else {
      courseData.id = this.state.id;
      this.props.editCourse(courseData);
    }
    this.props.history.push('/');
  }

  inputHendler(e) {
    const inputs = Array.from(document.querySelectorAll('input, textarea'));
    let isEmptyInput = false;

    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        isEmptyInput = true;
      }
    });

    const submitBtn = document.querySelector('.submit-btn');
    if (!isEmptyInput) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('disabled');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add('disabled');
    }
  }

  componentDidMount() {
    const inputs = Array.from(document.querySelectorAll('input, textarea'));
    inputs.forEach(inp => inp.addEventListener('input', this.inputHendler));

    let isEmptyInput = false;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        isEmptyInput = true;
      }
    });
    if (!isEmptyInput) {
      document.querySelector('.submit-btn').disabled = false;
      document.querySelector('.submit-btn').classList.remove('disabled');
    }
  }
}

export default withRouter(FormComponent);
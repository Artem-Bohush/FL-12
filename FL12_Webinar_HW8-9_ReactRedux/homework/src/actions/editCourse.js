export default function deleteCourse(courseData) {
  return {
    type: 'EDIT_COURSE',
    payload: courseData
  }
}
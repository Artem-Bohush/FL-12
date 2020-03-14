export default function deleteCourse(courseData) {
  return {
    type: 'ADD_COURSE',
    payload: courseData
  }
}
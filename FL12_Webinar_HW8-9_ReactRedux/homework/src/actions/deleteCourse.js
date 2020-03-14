export default function deleteCourse(courseId) {
  return {
    type: 'DELETE_COURSE',
    payload: courseId
  }
}
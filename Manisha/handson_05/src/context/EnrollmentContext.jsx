import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enroll, unenroll } from '../store/enrollmentSlice';

const EnrollmentContext = createContext();

export function EnrollmentProvider({ children }) {
  const enrolledCourses = useSelector(
    state => state.enrollment.enrolledCourses
  );
  const dispatch = useDispatch();

  function handleEnroll(course) {
    dispatch(enroll(course));
  }

  function handleUnenroll(id) {
    dispatch(unenroll(id));
  }

  return (
    <EnrollmentContext.Provider
      value={{ enrolledCourses, handleEnroll, handleUnenroll }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  return useContext(EnrollmentContext);
}
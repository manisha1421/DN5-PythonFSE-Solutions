import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard';
import { useEnrollment } from '../context/EnrollmentContext';
import {
  fetchAllCourses,
  selectCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../store/enrollmentSlice';

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleEnroll } = useEnrollment();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courseList = useSelector(selectCourses);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const filtered = courseList.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onEnroll(course) {
    handleEnroll(course);
    navigate('/profile');
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Available Courses</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      {loading && <p style={styles.loading}>Loading courses...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}
      <div style={styles.grid}>
        {filtered.map(course => (
          <div key={course.id}>
            <CourseCard {...course} onEnroll={onEnroll} />
            <button
              style={styles.detailBtn}
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '40px 32px' },
  title: { fontSize: '1.5rem', color: '#1a73e8', marginBottom: '20px' },
  input: {
    width: '100%', padding: '10px 16px', fontSize: '1rem',
    border: '1px solid #d0d7de', borderRadius: '6px', marginBottom: '20px',
  },
  loading: { color: '#1a73e8', fontWeight: 'bold', marginBottom: '16px' },
  error: { color: '#d93025', fontWeight: 'bold' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  detailBtn: {
    marginTop: '8px', width: '100%', padding: '8px',
    backgroundColor: 'white', color: '#1a73e8',
    border: '1px solid #1a73e8', borderRadius: '6px', cursor: 'pointer',
  },
};

export default CoursesPage;
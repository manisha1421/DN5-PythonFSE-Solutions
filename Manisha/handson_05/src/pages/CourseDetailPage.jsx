import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data';
import { useEnrollment } from '../context/EnrollmentContext';

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { handleEnroll } = useEnrollment();

  const course = courses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return <p style={styles.notFound}>Course not found!</p>;
  }

  function onEnroll() {
    handleEnroll(course);
    navigate('/profile');
  }

  return (
    <section style={styles.section}>
      <button style={styles.backBtn} onClick={() => navigate('/courses')}>
        ← Back to Courses
      </button>
      <div style={styles.card}>
        <h2 style={styles.title}>{course.name}</h2>
        <p style={styles.info}>Code: {course.code}</p>
        <p style={styles.info}>Credits: {course.credits}</p>
        <p style={styles.info}>Grade: {course.grade}</p>
        <button style={styles.enrollBtn} onClick={onEnroll}>
          Enroll in this Course
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '40px 32px' },
  notFound: { padding: '40px', color: '#d93025' },
  backBtn: {
    marginBottom: '20px', padding: '8px 16px',
    backgroundColor: 'white', color: '#1a73e8',
    border: '1px solid #1a73e8', borderRadius: '6px', cursor: 'pointer',
  },
  card: {
    backgroundColor: 'white', padding: '32px',
    borderRadius: '8px', border: '1px solid #d0d7de',
    maxWidth: '500px',
  },
  title: { fontSize: '1.8rem', color: '#1a73e8', marginBottom: '16px' },
  info: { fontSize: '1.1rem', color: '#555', marginBottom: '12px' },
  enrollBtn: {
    marginTop: '16px', padding: '12px 24px',
    backgroundColor: '#1a73e8', color: 'white',
    border: 'none', borderRadius: '6px',
    fontSize: '1rem', cursor: 'pointer',
  },
};

export default CourseDetailPage;
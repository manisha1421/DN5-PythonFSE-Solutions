import { Routes, Route, Link } from 'react-router-dom';
import { useEnrollment } from './context/EnrollmentContext';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import CourseDetailPage from './pages/CourseDetailPage';

function App() {
  const { enrolledCourses } = useEnrollment();

  return (
    <div>
      {/* Header with React Router Links */}
      <header style={styles.header}>
        <Link to="/" style={styles.siteName}>Student Portal</Link>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/" style={styles.navLink}>Home</Link></li>
            <li><Link to="/courses" style={styles.navLink}>Courses</Link></li>
            <li><Link to="/profile" style={styles.navLink}>Profile</Link></li>
            <li style={styles.badge}>Enrolled: {enrolledCourses.length}</li>
          </ul>
        </nav>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Student Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#1a73e8', color: 'white',
    padding: '16px 32px', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center',
  },
  siteName: {
    fontSize: '1.5rem', fontWeight: 'bold',
    color: 'white', textDecoration: 'none',
  },
  navList: {
    listStyle: 'none', display: 'flex',
    gap: '24px', alignItems: 'center',
  },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '1rem' },
  badge: {
    backgroundColor: 'white', color: '#1a73e8',
    padding: '4px 12px', borderRadius: '20px',
    fontWeight: 'bold', fontSize: '0.9rem',
  },
  footer: {
    backgroundColor: '#1a73e8', color: 'white',
    textAlign: 'center', padding: '20px',
    fontSize: '0.9rem', marginTop: '40px',
  },
};

export default App;
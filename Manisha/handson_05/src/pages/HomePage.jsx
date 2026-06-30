import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to the Student Portal</h1>
        <p style={styles.text}>
          Your one-stop destination to manage courses, grades, and your profile.
        </p>
        <button style={styles.btn} onClick={() => navigate('/courses')}>
          Explore Courses
        </button>
      </section>

      <section style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>3</span>
          <span style={styles.statLabel}>Courses Enrolled</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>3.8</span>
          <span style={styles.statLabel}>GPA</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>6</span>
          <span style={styles.statLabel}>Semester</span>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    backgroundColor: '#e8f0fe',
    textAlign: 'center',
    padding: '60px 32px',
  },
  title: {
    fontSize: '2rem',
    color: '#1a73e8',
    marginBottom: '16px',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '24px',
  },
  btn: {
    padding: '12px 28px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  statsBar: {
    backgroundColor: '#1a73e8',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px 32px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.85,
  },
};

export default HomePage;
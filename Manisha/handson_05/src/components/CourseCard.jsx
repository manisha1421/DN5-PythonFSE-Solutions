function CourseCard({ id, name, code, credits, grade, onEnroll }) {
  return (
    <article style={styles.card}>
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.code}>{code}</p>
      <span style={styles.credits}>Credits: {credits}</span>
      <p style={styles.grade}>Grade: {grade}</p>
      <button style={styles.btn} onClick={() => onEnroll({ id, name, code, credits, grade })}>
        Enroll
      </button>
    </article>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #d0d7de',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  title: {
    marginBottom: '8px',
    color: '#333',
  },
  code: {
    color: '#666',
    marginBottom: '8px',
  },
  credits: {
    fontWeight: 'bold',
    color: '#1a73e8',
    display: 'block',
    marginBottom: '8px',
  },
  grade: {
    color: '#555',
    marginBottom: '12px',
  },
  btn: {
    padding: '8px 16px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
};

export default CourseCard;
import { useState } from 'react';
import { useEnrollment } from '../context/EnrollmentContext';

function ProfilePage() {
  const { enrolledCourses, handleUnenroll } = useEnrollment();
  const [profile, setProfile] = useState({
    name: '', email: '', semester: ''
  });

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Student Profile</h2>

      {/* Profile Form */}
      <div style={styles.form}>
        <h3 style={styles.formTitle}>My Details</h3>
        <label style={styles.label}>Name</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
          style={styles.input}
        />
        <label style={styles.label}>Email</label>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={styles.input}
        />
        <label style={styles.label}>Semester</label>
        <input
          name="semester"
          value={profile.semester}
          onChange={handleChange}
          placeholder="Enter semester"
          style={styles.input}
        />
      </div>

      {/* Enrolled Courses */}
      <div style={styles.enrolledBox}>
        <h3 style={styles.formTitle}>
          Enrolled Courses ({enrolledCourses.length})
        </h3>
        {enrolledCourses.length === 0 ? (
          <p style={styles.empty}>No courses enrolled yet.</p>
        ) : (
          <ul style={styles.list}>
            {enrolledCourses.map(c => (
              <li key={c.id} style={styles.listItem}>
                <span>{c.name} — {c.code}</span>
                <button
                  style={styles.removeBtn}
                  onClick={() => handleUnenroll(c.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '40px 32px' },
  title: { fontSize: '1.5rem', color: '#1a73e8', marginBottom: '24px' },
  form: {
    backgroundColor: 'white', padding: '24px',
    borderRadius: '8px', marginBottom: '24px',
    border: '1px solid #d0d7de',
  },
  formTitle: { marginBottom: '16px', color: '#333' },
  label: { display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#555' },
  input: {
    width: '100%', padding: '10px', fontSize: '1rem',
    border: '1px solid #d0d7de', borderRadius: '6px', marginBottom: '16px',
  },
  enrolledBox: {
    backgroundColor: '#e8f0fe', padding: '24px', borderRadius: '8px',
  },
  empty: { color: '#666' },
  list: { listStyle: 'none' },
  listItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '10px 0',
    borderBottom: '1px solid #d0d7de',
  },
  removeBtn: {
    padding: '6px 12px', backgroundColor: '#d93025',
    color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
};

export default ProfilePage;